export const sanitizeUser = (user) => {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        bio: user.bio,
        coverPhoto: user.coverPhoto,
        createdAt: user.createdAt,
    };
};
