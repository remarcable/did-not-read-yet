import { ApolloServer, gql } from 'apollo-server';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // get the user token from the headers
        const token = req.headers.authorization || '';

        // try to retrieve a user with the token
        const user = {};

        // add the user to the context
        return { user };
    },
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
