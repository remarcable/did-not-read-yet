import express from 'express';
import passport from 'passport';
import bodyparser from 'body-parser';

import { getBearerStrategy } from './auth/getBearerStrategy';

export default function getExpressApp(mongo) {
    const app = express();

    app.use(bodyparser.json());
    app.use(passport.initialize());

    app.use((req, res, next) => {
        req.mongo = mongo;
        next();
    });

    passport.use('bearer', getBearerStrategy(mongo));

    app.post('/graphql', passport.authenticate('bearer', { session: false }));

    return app;
}
