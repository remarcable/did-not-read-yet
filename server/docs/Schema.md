# Schema for did-not-read-yet

## Query

```gql
{
    currentUser: User
    links(unread: Boolean, dismissed: Boolean, limit: Int): [Link!]!
    user(userId: ID!): User

    type User {
        _id
        username

        links(unread: Boolean, dismissed: Boolean, limit: Int): [Link!]! # own links

        followers: [User!]!
        following: [User!]!
    }
}
```

## Mutation

```gql
{
    addLink(link: LinkInput!): Link
    updateLink(linkId: ID!, input: LinkInput!): Link
    deleteLink(linkId: ID!): ?

    readLink(linkId: ID!): Link
    dismissLink(linkId: ID!): Link
    undismissLink(linkId: ID!): Link

    followUser(userId): User
    unfollowUser(userId): User
}
```
