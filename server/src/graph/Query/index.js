import { gql } from 'apollo-server-express';
import * as User from '@root/models/User';

function getLinksForUser() {
    return [];
}

export const queryDefs = gql`
    type Query {
        feed(filterBy: FilterInput, limit: Int, offset: Int): Feed!
        user(userId: ID!): User!
    }
`;

const resolvers = {
    async feed(parent, args, { userId, mongo }) {
        const user = await User.get(userId, { mongo });
        return {
            links: getLinksForUser(user),
            user,
        };
    },
};

export default resolvers;
