# Schema for did-not-read-yet

## Query

```gql
{
    currentUser: User
    user(userId: ID!): User

    type User {
        _id
        username

        links(filterBy: FilterInput, limit: Int, offset: Int): [Link!]!

        followers: [User!]!
        following: [User!]!
    }

    type FilterInput {
        read: Boolean
        dismissed: Boolean
        favorite: Boolean
    }

    type Link {
        _id: ID!
        title: String!
        createdAt: Date!
        url: URL!
        # description
        postedBy: User!

        read: Boolean!
        dismissed: Boolean!
        favorite: Boolean!
    }
}
```

## Mutation

```gql
{
    addLink(link: LinkInput!): Link
    updateLink(linkId: ID!, input: LinkInput!): Link # only possible in a small timeframe
    removeLink(linkId: ID!): ?

    markLink(linkId: ID!, markAs: FilterInput!): Link

    followUser(userId): User
    unfollowUser(userId): User

    type LinkInput {
        title: String!
        url: URL!
    }
}
```
