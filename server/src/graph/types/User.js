export const userResolver = {
    User: {
        submittedLinks: (user, { limit, offset }) => {
            return user.getSubmittedLinks({ limit, offset });
        },
        followers: user => {
            return user.getFollowers();
        },
        following: user => {
            return user.getFollowing();
        },
    },
};
