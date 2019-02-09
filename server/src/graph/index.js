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
        return { user: req.user, mongo: req.mongo };
    },
});
