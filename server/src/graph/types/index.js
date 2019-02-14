import { gql, concatenateTypeDefs } from 'apollo-server-express';
import merge from 'lodash.merge';

import { dateResolvers } from './Date';
import { absoluteUrlResolver } from './AbsoluteUrl';
import { userResolver } from './User';
import { linkResolver } from './Link';

const scalars = gql`
    scalar DateTime
    scalar Date
    scalar AbsoluteUrl
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
        url: AbsoluteUrl!
        postedBy: User!

        isRead: Boolean!
        isArchived: Boolean!
        isFavorite: Boolean!
    }

    type AuthPayload {
        token: String!
    }

    input UserInput {
        name: String!
        password: String!
    }

    input LinkInput {
        title: String!
        url: AbsoluteUrl!
    }

    input FilterInput {
        isRead: Boolean
        isArchived: Boolean
        isFavorite: Boolean
    }
`;

export const typeDefs = concatenateTypeDefs([scalars, types]);
export const typeResolvers = merge(dateResolvers, absoluteUrlResolver, userResolver, linkResolver);
