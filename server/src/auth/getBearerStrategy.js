import { Strategy as BearerStrategy } from 'passport-http-bearer';

const defaultUser = { id: 123, username: 'marc', info: '12!' };
const defaultUser2 = { id: 125, username: 'rico', info: '16!' };

// eslint-disable-next-line
export function getBearerStrategy() {
    return new BearerStrategy((token, done) => {
        if (token === 'marc') {
            return done(null, defaultUser);
        }

        if (token === 'rico') {
            return done(null, defaultUser2);
        }

        return done(null, false);
    });
}
