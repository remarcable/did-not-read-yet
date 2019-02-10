export const userResolver = {
    User: {
        submittedLinks: async ({ _id }, { limit, offset }, { getUser }) => {
            const user = await getUser(_id, { fields: null });
            return user.getSubmittedLinks({ limit, offset });
        },
        followers: async ({ _id }, args, { getUser }) => {
            const user = await getUser(_id, { fields: null });
            return user.getFollowerIds();
        },
        following: async ({ _id }, args, { getUser }) => {
            const user = await getUser(_id, { fields: null });
            return user.getFollowingIds();
        },
    },
};
