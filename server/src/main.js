import getMongoConnection from './db/getMongoConnection';
import createMongoIndexes from './db/createMongoIndexes';
import getExpressApp from './app';
import apolloServer from './graph';

getMongoConnection().then(async mongo => {
    await createMongoIndexes(mongo);

    const app = getExpressApp(mongo);
    apolloServer.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        // eslint-disable-next-line no-console
        console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`);
    });
});
