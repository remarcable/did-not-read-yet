import { gql } from 'apollo-server-express';

export const mutationDefs = gql`
    type Mutation {
        addLink(link: LinkInput!): User!
        updateLink(linkId: ID!, input: LinkInput!): Link!
        removeLink(linkId: ID!): User!

        markLink(linkId: ID!, markAs: FilterInput!): Link!

        followUser(userId: ID!): Feed!
        unfollowUser(userId: ID!): Feed!
    }
`;

const resolvers = {
    addLink(parent, args, { user }) {
        return user;
    },
};

export default resolvers;
