import { createMongoLoader } from '@root/helpers/createMongoLoader';

export function createDataLoaders({ mongo }) {
    return {
        links: createMongoLoader({ collectionName: 'links', mongo }),
        users: createMongoLoader({ collectionName: 'users', mongo }),
    };
}
