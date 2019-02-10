import { gql } from 'apollo-server-express';
import * as User from '@root/models/User';

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
            links: await user.getLinksForFeed(),
            user,
        };
    },
};

export default resolvers;
