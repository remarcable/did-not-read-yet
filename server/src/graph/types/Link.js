async function getFlagsForLink({ linkId, userId, mongo }) {
    const flags = await mongo
        .collection('users-link')
        .find({ linkId, userId })
        .next();

    const { isRead = false, isArchived = false, isFavorite = false } = flags;
    return { isRead, isArchived, isFavorite };
}

export const linkResolver = {
    Link: {
        isRead: async ({ _id: linkId }, args, { currentUser: { userId }, mongo }) =>
            (await getFlagsForLink({ linkId, userId, mongo })).isRead,
        isArchived: async ({ _id: linkId }, args, { currentUser: { userId }, mongo }) =>
            (await getFlagsForLink({ linkId, userId, mongo })).isArchived,
        isFavorite: async ({ _id: linkId }, args, { currentUser: { userId }, mongo }) =>
            (await getFlagsForLink({ linkId, userId, mongo })).isFavorite,
        postedBy: ({ postedBy }, args, { dataLoaders }) => {
            return dataLoaders.users.load(postedBy);
        },
    },
};
