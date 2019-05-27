const fs = require('fs');
const path = require('path');
const NodeEnvironment = require('jest-environment-node');

const globalMongoConfigPath = path.join(__dirname, 'globalMongoConfig.json');

class MongoEnvironment extends NodeEnvironment {
    async setup() {
        const globalMongoConfig = JSON.parse(fs.readFileSync(globalMongoConfigPath, 'utf-8'));
        this.global.process.env.MONGO_URL = globalMongoConfig.mongoUri;
        await super.setup();
    }
}

module.exports = MongoEnvironment;
