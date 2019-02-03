# Schema for did-not-read-yet

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
    username: String!
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

    read: Boolean!
    dismissed: Boolean!
    favorite: Boolean!
}

input FilterInput {
    read: Boolean
    dismissed: Boolean
    favorite: Boolean
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
}
```

```gql
input LinkInput {
    title: String!
    url: URL!
}
```
