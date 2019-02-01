import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
    type Query {
        hello: String
        currentUser: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello world!',
        currentUser: (parent, args, { user }) => user.id,
    },
};

export default new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        return { user: req.user };
    },
});
