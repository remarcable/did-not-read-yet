import { gql, concatenateTypeDefs } from 'apollo-server-express';
import merge from 'lodash.merge';

import { dateResolvers } from './Date';
import { absoluteURLResolver } from './AbsoluteURL';

const scalars = gql`
    scalar DateTime
    scalar Date
    scalar AbsoluteURL
`;

const types = gql`
    type Feed {
        user: User!
        links: [Link!]!
    }

    type User {
        _id: ID!
        name: String!
        createdAt: Date!

        submittedLinks(limit: Int, offset: Int): [Link!]!

        followers: [User!]!
        following: [User!]!
    }

    type Link {
        _id: ID!
        title: String!
        createdAt: DateTime!
        url: AbsoluteURL!
        postedBy: User!

        isRead: Boolean!
        isArchived: Boolean!
        isFavorite: Boolean!
    }

    input LinkInput {
        title: String!
        url: AbsoluteURL!
    }

    input FilterInput {
        isRead: Boolean
        isArchived: Boolean
        isFavorite: Boolean
    }
`;

export const typeDefs = concatenateTypeDefs([scalars, types]);
export const typeResolvers = merge(dateResolvers, absoluteURLResolver);
