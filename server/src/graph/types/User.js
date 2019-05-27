export const userResolver = {
    User: {
        submittedLinks: ({ _id }, { limit = 0, offset = 0 }, { mongo }) => {
            return mongo
                .collection('links')
                .find({ postedBy: _id })
                .skip(offset)
                .limit(limit)
                .toArray();
        },
        followers: async ({ _id }, args, { dataLoaders, mongo }) => {
            const followerDocuments = await mongo
                .collection('followers')
                .find({ userToFollow: _id })
                .toArray();
            const followerIds = followerDocuments.map(doc => doc.userId);
            return dataLoaders.users.loadMany(followerIds);
        },
        following: async ({ _id }, args, { dataLoaders, mongo }) => {
            const followingDocuments = await mongo
                .collection('followers')
                .find({ userId: _id })
                .toArray();
            const followingIds = followingDocuments.map(doc => doc.userToFollow);
            return dataLoaders.users.loadMany(followingIds);
        },
    },
};
