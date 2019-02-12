import { ApolloServer, concatenateTypeDefs } from 'apollo-server-express';
import merge from 'lodash.merge';
import { typeDefs, typeResolvers } from './types';
import Query, { queryDefs } from './Query';
import Mutation, { mutationDefs } from './Mutation';

const resolvers = {
    Query,
    Mutation,
};

export default new ApolloServer({
    typeDefs: concatenateTypeDefs([queryDefs, mutationDefs, typeDefs]),
    resolvers: merge(resolvers, typeResolvers),
    context: ({ req }) => {
        const { currentUser, dataLoaders, mongo } = req;
        return { currentUser, dataLoaders, mongo };
    },
    mocks: {
        Date: () => new Date(),
        AbsoluteUrl: () => 'https://example.com',
    },
    mockEntireSchema: false,
});
