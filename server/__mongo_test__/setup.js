const fs = require('fs');
const path = require('path');
const MongodbMemoryServer = require('mongodb-memory-server').default;

const getMongoConnection = require('../src/db/getMongoConnection').default;
const createMongoIndexes = require('../src/db/createMongoIndexes').default;

const globalMongoConfigPath = path.join(__dirname, 'globalMongoConfig.json');

const mongoDBName = 'dnry';
const mongod = new MongodbMemoryServer({
    instance: { dbName: mongoDBName },
    binary: { version: '3.6.10' },
    autoStart: false,
});

module.exports = async () => {
    if (!mongod.isRunning) {
        await mongod.start();
    }

    const mongoConfig = {
        mongoDBName,
        mongoUri: await mongod.getConnectionString(),
    };

    // Write global config to disk because all tests run in different contexts.
    fs.writeFileSync(globalMongoConfigPath, JSON.stringify(mongoConfig));

    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = mongod;
    process.env.MONGO_URL = mongoConfig.mongoUri;

    const mongo = await getMongoConnection();
    await createMongoIndexes(mongo);
};
