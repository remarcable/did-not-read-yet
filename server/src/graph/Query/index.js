import { gql } from 'apollo-server-express';

function getLinksForUser() {}

export const queryDefs = gql`
    type Query {
        feed(filterBy: FilterInput, limit: Int, offset: Int): Feed!
        user(userId: ID!): User!
    }
`;

const resolvers = {
    feed(parent, args, { user }) {
        return {
            links: getLinksForUser(user),
            user,
        };
    },
};

export default resolvers;
