# GraphQL-Schema for did-not-read-yet

## Query

```gql
{
    feed(filterBy: FilterInput, limit: Int, offset: Int): Feed!
    user(userId: ID!): User!
}
```

```gql
type Feed {
    user: User! # currentUser
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
    url: URL!
    postedBy: User!

    isRead: Boolean!
    isArchived: Boolean!
    isFavorite: Boolean!
}

input FilterInput {
    isRead: Boolean
    isArchived: Boolean
    isFavorite: Boolean
}
```

## Mutation

```gql
{
    addLink(link: LinkInput!): User! # currentUser with updated submissions
    updateLink(linkId: ID!, input: LinkInput!): Link! # only possible in a small timeframe
    removeLink(linkId: ID!): User! # currentUser with updated submissions

    markLink(linkId: ID!, markAs: FilterInput!): Link!

    followUser(userId: ID!): Feed! # update user.following and links in feed
    unfollowUser(userId: ID!): Feed! # update user.following and links in feed

    signup(user: UserInput!): AuthPayload!
    login(email: Email!, password: String!): AuthPayload!
}
```

```gql
input LinkInput {
    title: String!
    url: URL!
}

input UserInput {
    name: String!
    password: String!
}

type AuthPayload {
    token: String!
}
```
