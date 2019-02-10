import { ApolloServer, concatenateTypeDefs } from 'apollo-server-express';
import merge from 'lodash.merge';
import { typeDefs, typeResolvers } from './types';
import Query, { queryDefs } from './Query';
import Mutation, { mutationDefs } from './Mutation';

import * as User from '../models/User';

const resolvers = {
    Query,
    Mutation,
};

export default new ApolloServer({
    typeDefs: concatenateTypeDefs([queryDefs, mutationDefs, typeDefs]),
    resolvers: merge(resolvers, typeResolvers),
    context: ({ req }) => {
        const { userId: currentUserId, mongo } = req;
        const getCurrentUser = (options, ...params) =>
            User.get(currentUserId, { mongo, ...options }, params);
        const getUser = (userId, options, ...params) =>
            User.get(userId, { mongo, ...options }, params);
        return { getCurrentUser, getUser, mongo };
    },
    mocks: {
        Date: () => new Date(),
        AbsoluteUrl: () => 'https://example.com',
    },
    mockEntireSchema: false,
});
