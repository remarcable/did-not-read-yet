import express from 'express';
import bodyparser from 'body-parser';

import { getUserIdFromAuthToken } from './auth';
import { createDataLoaders } from './loaders';

export default function getExpressApp(mongo) {
    const app = express();
    app.use(bodyparser.json());

    app.use(
        asyncMiddleware(async (req, res, next) => {
            const dataLoaders = createDataLoaders({ mongo });
            req.dataLoaders = dataLoaders;

            req.mongo = mongo;

            next();
        })
    );

    app.use(
        asyncMiddleware(async (req, res, next) => {
            const { authorization = '' } = req.headers;
            const [, token = null] = authorization.split('Bearer ');

            req.userId = await getUserIdFromAuthToken({ token, mongo });
            next();
        })
    );

    return app;
}

const asyncMiddleware = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
