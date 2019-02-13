import { gql } from 'apollo-server-express';

async function getFeed({ userId, filterBy, limit, offset }) {
    return [];
}

export const queryDefs = gql`
    type Query {
        feed(filterBy: FilterInput, limit: Int, offset: Int): Feed
        user(userId: ID!): User!
    }
`;

const resolvers = {
    async feed(parent, { filterBy, limit, offset }, { userId, dataLoaders }) {
        if (!userId) {
            return null;
        }

        return {
            links: await getFeed({ userId: userId._id, filterBy, limit, offset }),
            user: await dataLoaders.users.load(userId),
        };
    },
    async user(parent, { userId }, { dataLoaders }) {
        return dataLoaders.users.load(userId);
    },
};

export default resolvers;
