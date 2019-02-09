export function getMany({ userIds, fields = {}, mongo }) {
    return mongo
        .collection('users')
        .find({ _id: { $in: userIds } })
        .project(fields)
        .next();
}

export async function getFollowerIds({ _id, mongo }) {}
export async function getFollowingIds({ _id, mongo }) {}

export async function getSubmittedLinks({ _id, limit, offset, mongo }) {}

export async function getFeed({ _id, mongo }) {}

export async function follow({ _id, userToFollow, mongo }) {}
export async function unfollow({ _id, userToFollow, mongo }) {}

export async function addLink({ _id, link, mongo }) {}
export async function updateLink({ _id, linkId, updatedFields, mongo }) {}
export async function removeLink({ _id, linkId, mongo }) {}

export async function markLink({ _id, linkId, markAs, mongo }) {}
