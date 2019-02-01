import { Strategy as BearerStrategy } from 'passport-http-bearer';

export function getBearerStrategy(mongo) {
    return new BearerStrategy(async (token, done) => {
        const user = await mongo.collection('users').findOne({ tokens: token });

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    });
}
