export const getFollowerIds = ({ _id, mongo }) => async () => {};
export const getFollowingIds = ({ _id, mongo }) => async () => {};

export const getSubmittedLinks = ({ _id, mongo }) => async ({ limit, offset }) => {};

export const getFeed = ({ _id, mongo }) => async () => {};

export const follow = ({ _id, mongo }) => async ({ userId }) => {};
export const unfollow = ({ _id, mongo }) => async ({ userId }) => {};

export const addLink = ({ _id, mongo }) => async ({ fields }) => {};
export const updateLink = ({ _id, mongo }) => async ({ linkId, updatedFields }) => {};
export const removeLink = ({ _id, mongo }) => async ({ linkId }) => {};

export const markLink = ({ _id, mongo }) => async ({ linkId, markAs }) => {};
