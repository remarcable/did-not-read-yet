import { gql } from 'apollo-server-express';

async function getFeed({ userId, filterBy, limit, offset }) {
    return [];
}

export const queryDefs = gql`
    type Query {
        feed(filterBy: FilterInput, limit: Int, offset: Int): Feed!
        user(userId: ID!): User!
    }
`;

const resolvers = {
    async feed(parent, { filterBy, limit, offset }, { currentUser }) {
        return {
            links: await getFeed({ userId: currentUser._id, filterBy, limit, offset }),
            user: currentUser,
        };
    },
    async user(parent, { userId }, { dataLoaders }) {
        return dataLoaders.users.load(userId);
    },
};

export default resolvers;
