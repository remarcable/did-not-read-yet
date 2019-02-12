import DataLoader from 'dataloader';

export async function getMultipleMongoDocuments({ documentIds, collectionName, mongo }) {
    const documents = await mongo
        .collection(collectionName)
        .find({ _id: { $in: documentIds } })
        .toArray();

    // return documents in order they were queried because that's how dataloader knows
    // which id correlates to what. Return null if mongo has no doc for a specific id

    // TODO because this always is a sequential search maybe use something similar to
    // https://github.com/facebook/dataloader/blob/master/examples/RethinkDB.md
    return documentIds.map(documentId => {
        return documents.find(doc => doc._id === documentId) || null;
    });
}

export function createMongoLoader({ collectionName, mongo }) {
    return new DataLoader(documentIds =>
        getMultipleMongoDocuments({ documentIds, collectionName, mongo })
    );
}
