import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import Random from 'meteor-random';
import config from '@root/config';

const { jwtSecret } = config;
export const MAX_TOKEN_COUNT = 5;

export async function getUserIdFromAuthToken({ token, mongo }) {
    const user = await mongo
        .collection('users')
        .findOne({ tokens: token }, { projection: { _id: 1 } });

    if (!user) {
        return null;
    }

    return user._id;
}

export async function saveAuthTokenToUser({ token, userId, mongo }) {
    const user = await mongo
        .collection('users')
        .findOne({ _id: userId }, { projection: { tokens: 1 } });

    if (!user) {
        throw new Error(`Saving token to user ${userId} failed: User does not exist`);
    }

    const { tokens: oldTokens } = user;

    const newTokens = [token, ...oldTokens.slice(0, MAX_TOKEN_COUNT - 1)];

    return mongo.collection('users').updateOne({ _id: userId }, { $set: { tokens: newTokens } });
}

export function generateAuthToken({ userId }) {
    return jwt.encode({ userId, createdAt: new Date() }, jwtSecret);
}

export async function signup({ user, mongo }) {
    const { name, password: clearTextPassword } = user;

    const username = sanitizeUsername(name);
    const passwordHash = await bcrypt.hash(clearTextPassword, 10);

    const userId = Random.id();
    const authToken = generateAuthToken({ userId });

    // TODO: maybe try/catch with custom error
    await mongo.collection('users').insertOne({
        _id: userId,
        name: username,
        password: passwordHash,
        createdAt: new Date(),
        tokens: [authToken],
    });

    return { token: authToken };
}

class GenericLoginError extends Error {}

export async function login({ name, password: clearTextPassword, mongo }) {
    const username = sanitizeUsername(name);
    const user = await mongo
        .collection('users')
        .findOne({ name: username }, { projection: { tokens: 1, password: 1 } });

    if (!user) {
        // TODO: improve what kind of error is thrown when
        throw new GenericLoginError();
    }

    const passwordIsCorrect = await bcrypt.compare(clearTextPassword, user.password);

    if (!passwordIsCorrect) {
        // TODO: improve what kind of error is thrown when
        throw new GenericLoginError();
    }

    const userId = user._id;
    const token = generateAuthToken({ userId });

    await saveAuthTokenToUser({ token, userId, mongo });

    return { token };
}

export function sanitizeUsername(name) {
    return name.trim().toLowerCase(); // TODO: add better validation
}
