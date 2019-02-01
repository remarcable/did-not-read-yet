import express from 'express';
import passport from 'passport';
import bodyparser from 'body-parser';

import { getBearerStrategy } from './auth/getBearerStrategy';

export default function getExpressApp() {
    const app = express();

    app.use(bodyparser.json());
    app.use(passport.initialize());

    passport.use('bearer', getBearerStrategy());

    app.post('/graphql', passport.authenticate('bearer', { session: false }));

    return app;
}
