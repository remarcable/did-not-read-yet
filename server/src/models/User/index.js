import * as API from './api';

export async function get(_id, { fields = {}, mongo }) {
    if (_id === null) {
        return null;
    }

    const user = await mongo
        .collection('users')
        .find({ _id })
        .project(fields)
        .limit(1)
        .next();

    const userWithMethods = {
        ...user,
        getFollowerIds: () => API.getFollowerIds({ _id, mongo }),
        getFollowingIds: () => API.getFollowingIds({ _id, mongo }),
        getSubmittedLinks: ({ limit, offset }) =>
            API.getSubmittedLinks({ _id, limit, offset, mongo }),
        getFeed: () => API.getFeed({ _id, mongo }),
        follow: ({ userId }) => API.follow({ _id, userToFollow: userId, mongo }),
        unfollow: ({ userId }) => API.follow({ _id, userToFollow: userId, mongo }),
        addLink: ({ link }) => API.addLink({ _id, link, mongo }),
        updateLink: ({ linkId, updatedFields }) =>
            API.updateLink({ _id, linkId, updatedFields, mongo }),
        removeLink: ({ linkId }) => API.removeLink({ _id, linkId, mongo }),
        markLink: ({ linkId, markAs }) => API.removeLink({ _id, linkId, markAs, mongo }),
    };

    return userWithMethods;
}
