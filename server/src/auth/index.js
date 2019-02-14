import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';
import Random from 'meteor-random';
import config from '@root/config';

const { jwtSecret } = config;
export const MAX_TOKEN_COUNT = 5;

export async function getUserIdFromAuthToken({ token, mongo }) {
    const user = await mongo
        .collection('users')
        .find({ tokens: token })
        .project({ _id: 1 })
        .limit(1)
        .next();

    if (!user) {
        return null;
    }

    return user._id;
}

export async function saveAuthTokenToUser({ token, userId, mongo }) {
    const user = await mongo
        .collection('users')
        .find({ _id: userId })
        .project({ tokens: 1 })
        .limit(1)
        .next();

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

    await mongo.collection('users').insertOne({
        name: username,
        password: passwordHash,
        createdAt: new Date(),
        tokens: [authToken],
    });

    return { token: authToken };
}

export async function login({ name, password: clearTextPassword, mongo }) {
    const username = sanitizeUsername(name);
    const user = await mongo
        .collection('users')
        .findOne({ name: username }, { fields: { tokens: 1, password: 1 } });

    if (!user) {
        return null; // TODO: throw error?
    }

    const passwordIsCorrect = await bcrypt.compare(user.password, clearTextPassword);

    if (!passwordIsCorrect) {
        return null; // TODO: throw error?
    }

    const userId = user._id;
    const token = generateAuthToken({ userId });

    await saveAuthTokenToUser({ token, userId, mongo });

    return { token };
}

export function sanitizeUsername(name) {
    return name.trim().toLowerCase(); // TODO: add better validation
}
