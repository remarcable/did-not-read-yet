import { GraphQLDateTime, GraphQLDate } from 'graphql-iso-date';

export const dateResolvers = {
    DateTime: GraphQLDateTime,
    Date: GraphQLDate,
};
