import { curryMethods } from '@root/helpers/curryMethods';
import * as apiMethods from './apiMethods';

export const methods = ({ _id, mongo }) => curryMethods(apiMethods, { _id, mongo });

export async function get(_id, { fields = {}, mongo }) {
    if (_id === null) {
        return null;
    }

    const user =
        fields !== null
            ? await mongo
                  .collection('users')
                  .find({ _id })
                  .project(fields)
                  .limit(1)
                  .next()
            : { _id };

    const userWithMethods = {
        ...user,
        ...methods({ _id, mongo }),
    };

    return userWithMethods;
}

export function getMany({ userIds, fields = {}, mongo }) {
    return mongo
        .collection('users')
        .find({ _id: { $in: userIds } })
        .project(fields)
        .next();
}
