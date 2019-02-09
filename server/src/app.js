import express from 'express';
import passport from 'passport';
import bodyparser from 'body-parser';

import { getBearerStrategy } from './auth/getBearerStrategy';

export default function getExpressApp(mongo) {
    const app = express();

    app.use(bodyparser.json());
    app.use(passport.initialize());

    passport.use('bearer', getBearerStrategy(mongo));

    app.post('/graphql', passport.authenticate('bearer', { session: false }));

    app.use((req, res, next) => {
        const { user = {} } = req;

        req.mongo = mongo;
        req.userId = user._id || null;
        next();
    });

    return app;
}
