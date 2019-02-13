import express from 'express';
import passport from 'passport';
import bodyparser from 'body-parser';

import { getBearerStrategy } from './auth/getBearerStrategy';
import { createDataLoaders } from './loaders';

export default function getExpressApp(mongo) {
    const app = express();

    app.use(bodyparser.json());
    app.use(passport.initialize());

    passport.use('bearer', getBearerStrategy(mongo));

    app.post('/graphql', passport.authenticate('bearer', { session: false }));

    app.use(
        asyncMiddleware(async (req, res, next) => {
            const { user = {} } = req;
            const userId = user._id || null;
            req.userId = userId;

            req.dataLoaders = dataLoaders;
            const dataLoaders = createDataLoaders({ mongo });

            req.mongo = mongo;

            next();
        })
    );

    return app;
}

const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
