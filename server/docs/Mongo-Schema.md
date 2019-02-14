# Mongo-Schema for did-not-read-yet

## Collections

-   users
-   followers
-   links
-   users-links // better name!

## `users`

```js
{
    _id: String,
    createdAt: Date,
    name: String,
    tokens: [String],
    password: String,
}
```

## `followers`

```js
{
    _id: String,
    userId: String,
    userToFollow: String,
}
```

## `links`

```js
{
    _id: String,
    title: String,
    createdAt: Date,
    url: String,
    postedBy: String,
}
```

## `users-links`

```js
{
    _id: String,
    userId: String,
    linkId: String,
    isRead: Boolean,
    isArchived: Boolean,
    isFavorite: Boolean,
}
```
