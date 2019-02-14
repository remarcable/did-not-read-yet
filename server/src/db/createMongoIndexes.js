export default async function createMongoIndexes(mongo) {
    await mongo.collection('users').createIndexes([
        {
            key: { tokens: 1 },
            unique: true,
        },
        {
            key: { name: 1 },
            unique: true,
        },
    ]);

    await mongo.collection('links').createIndexes([
        {
            key: { postedBy: 1 },
        },
    ]);

    await mongo.collection('followers').createIndexes([
        {
            key: { userId: 1, userToFollow: 1 },
            unique: true,
        },
    ]);

    await mongo.collection('users-links').createIndexes([
        {
            key: { userId: 1, linkId: 1 },
            unique: true,
        },
    ]);
}
