export const linkResolver = {
    Link: {
        isRead: () => false,
        isArchived: () => false,
        isFavorite: () => false,
        postedBy: () => ({}),
    },
};
