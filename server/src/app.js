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
            const dataLoaders = createDataLoaders({ mongo });
            req.dataLoaders = dataLoaders;
            req.mongo = mongo;

            const { user = {} } = req;
            const userId = user._id;
            if (userId) {
                const currentUser = await dataLoaders.users.load(userId);
                req.currentUser = currentUser;
            } else {
                req.currentUser = null;
            }

            next();
        })
    );

    return app;
}

const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
