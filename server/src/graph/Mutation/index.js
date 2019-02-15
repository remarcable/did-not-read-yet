import { gql, ApolloError } from 'apollo-server-express';
import { signup, login } from '@root/auth';

export const mutationDefs = gql`
    type Mutation {
        addLink(link: LinkInput!): User!
        updateLink(linkId: ID!, input: LinkInput!): Link!
        removeLink(linkId: ID!): User!

        markLink(linkId: ID!, markAs: FilterInput!): Link!

        followUser(userId: ID!): Feed!
        unfollowUser(userId: ID!): Feed!

        signup(user: UserInput!): AuthPayload!
        login(name: String!, password: String!): AuthPayload!
    }
`;

const resolvers = {
    addLink(parent, args, { userId, dataLoaders }) {
        return dataLoaders.users.clear(userId).load(userId);
    },
    signup(parent, { user }, { userId, mongo }) {
        if (userId) {
            throw new ApolloError('User is already logged in', 'USER_ALREADY_LOGGED_IN_ERROR');
        }
        return signup({ user, mongo });
    },
    login(parent, { name, password }, { userId, mongo }) {
        if (userId) {
            throw new ApolloError('User is already logged in', 'USER_ALREADY_LOGGED_IN_ERROR');
        }

        return login({ name, password, mongo });
    },
};

export default resolvers;
