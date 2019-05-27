import Random from 'meteor-random';
import getMongoConnection from '@root/db/getMongoConnection';
import createMongoIndexes from '@root/db/createMongoIndexes';

import {
    getUserIdFromAuthToken,
    MAX_TOKEN_COUNT,
    saveAuthTokenToUser,
    signup,
    login,
    sanitizeUsername,
} from './index';

describe('Authentication', () => {
    let mongo = null;
    beforeAll(async () => {
        mongo = await getMongoConnection();
        await createMongoIndexes(mongo); // needed for signup tests
    });

    afterAll(async () => {
        await mongo.close();
        mongo = null;
    });

    describe('getUserIdFromAuthToken({ token, mongo })', () => {
        const testUserId = Random.id();
        const testTokens = ['my-test-token1', 'my-test-token2', 'my-test-token2'];
        beforeAll(async () => {
            await mongo
                .collection('users')
                .insertOne({ _id: testUserId, name: Random.id(), tokens: testTokens });
        });

        afterAll(async () => {
            await mongo.collection('users').removeOne({ _id: testUserId });
        });

        it('returns the correct userId for an authToken', async () => {
            const userId = await getUserIdFromAuthToken({ token: testTokens[1], mongo });
            expect(userId).toBe(testUserId);
        });

        it('returns the same userId for two auth tokens that are saved in the same user', async () => {
            const userId1 = await getUserIdFromAuthToken({ token: testTokens[0], mongo });
            const userId2 = await getUserIdFromAuthToken({ token: testTokens[1], mongo });
            expect(userId1).toBe(userId2);
        });

        it('returns null if no user with that token exists', async () => {
            const userId = await getUserIdFromAuthToken({
                token: 'does not exist',
                mongo,
            });
            expect(userId).toBeNull();
        });
    });

    describe('saveAuthTokenToUser({ token, userId, mongo })', () => {
        let testUserId = null;
        const getUserDoc = () => mongo.collection('users').findOne({ _id: testUserId });

        beforeEach(async () => {
            testUserId = Random.id();
            await mongo
                .collection('users')
                .insertOne({ _id: testUserId, name: Random.id(), tokens: [] });
        });

        afterEach(async () => {
            testUserId = null;
            await mongo.collection('users').removeOne({ _id: testUserId });
        });

        it('adds a token to user.tokens', async () => {
            const token = Random.id();
            await saveAuthTokenToUser({ token, userId: testUserId, mongo });
            const user = await getUserDoc();

            expect(user.tokens).toEqual([token]);
        });

        it('adds multiple tokens to user.tokens', async () => {
            const token1 = Random.id();
            const token2 = Random.id();
            await saveAuthTokenToUser({ token: token1, userId: testUserId, mongo });
            await saveAuthTokenToUser({ token: token2, userId: testUserId, mongo });
            const user = await getUserDoc();

            expect(user.tokens).toEqual([token2, token1]);
        });

        it(`removes the oldest token if a user has more than ${MAX_TOKEN_COUNT} tokens and adds the new one`, async () => {
            const tokens = ['1', '2', '3', '4', '5'];
            await mongo.collection('users').updateOne({ _id: testUserId }, { $set: { tokens } });

            const token = 'new token';
            await saveAuthTokenToUser({ token, userId: testUserId, mongo });

            const user = await getUserDoc();

            expect(user.tokens).toEqual([token, tokens[0], tokens[1], tokens[2], tokens[3]]);
        });
    });

    describe('signup({ user, mongo })', () => {
        const getUserCount = () => {
            return mongo.collection('users').countDocuments();
        };

        it('creates one document in the users collection', async () => {
            const userInput = { name: Random.id(), password: 'my-password' };
            const userCountBeforeSignup = await getUserCount();
            await signup({ user: userInput, mongo });
            const userCountAfterSignup = await getUserCount();

            expect(userCountAfterSignup - userCountBeforeSignup).toBe(1);
        });

        it('returns an object with token', async () => {
            const userInput = { name: Random.id(), password: 'my-password' };
            const obj = await signup({ user: userInput, mongo });

            expect(obj).toHaveProperty('token');
            expect(typeof obj.token).toBe('string');
        });

        it('throws when user with same name already exists', async () => {
            const userInput = { name: Random.id(), password: 'my-password' };
            await signup({ user: userInput, mongo });
            await expect(signup({ user: userInput, mongo })).rejects.toThrow();
        });
    });

    describe('login({ name, password, mongo })', () => {
        const user = {
            name: 'my-username',
            password: 'secret',
        };

        beforeEach(async () => {
            await signup({ user, mongo });
            const mongoUser = await mongo.collection('users').findOne({ name: user.name });
            user._id = mongoUser._id;
        });

        afterEach(async () => {
            await mongo.collection('users').removeOne({ _id: user._id });
        });

        it('returns an object with an auth token on successful login', async () => {
            const obj = await login({ name: user.name, password: user.password, mongo });

            expect(obj).not.toBeNull();
            expect(obj).toHaveProperty('token');
            expect(typeof obj.token).toBe('string');
        });

        it('adds the returned token to the user document', async () => {
            const { token } = await login({ name: user.name, password: user.password, mongo });
            const updatedUserDocument = await mongo.collection('users').findOne({ _id: user._id });
            expect(updatedUserDocument.tokens).toContain(token);
        });

        it('throws an error when the user does not exist', async () => {
            await expect(
                login({ name: 'does-not-exist', password: 'secret', mongo })
            ).rejects.toThrow();
        });
        it('throws an error when the password is not correct', async () => {
            await expect(
                login({ name: user.name, password: 'not-correct', mongo })
            ).rejects.toThrow();
        });
    });

    describe('sanitizeUsername(name)', () => {
        it('returns the username in lowercase', () => {
            expect(sanitizeUsername('MARC')).toBe('marc');
        });

        it('removes spaces at the back and the front', () => {
            expect(sanitizeUsername('   marc   ')).toBe('marc');
        });

        it('can handle empty strings', () => {
            expect(sanitizeUsername('')).toBe('');
        });
    });
});
