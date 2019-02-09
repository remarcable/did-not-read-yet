import { Strategy as BearerStrategy } from 'passport-http-bearer';

export function getBearerStrategy(mongo) {
    return new BearerStrategy(async (token, done) => {
        const user = await mongo
            .collection('users')
            .find({ tokens: token })
            .project({ _id: 1 })
            .limit(1)
            .next();

        if (user) {
            return done(null, user);
        }

        return done(null, false);
    });
}
