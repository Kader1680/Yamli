import prisma from "../config/prisma.js";

export const findProfileById = async (userId) => {
    return prisma.user.findUnique({
        where: {
            id: userId, 
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            bio: true,
            coverPhoto: true,
            createdAt: true,
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });
};

// export const findProfileByUsername = async (username) => {
//     return prisma.user.findUnique({
//         where: {
//             username,
//         },
//         select: {
//             id: true,
//             firstName: true,
//             lastName: true,
//             username: true,
//             bio: true,
//             coverPhoto: true,
//             createdAt: true,
//             _count: {
//                 select: {
//                     posts: true,
//                 },
//             },
//         },
//     });
// };

export const updateProfile = async (userId, data) => {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            bio: true,
            coverPhoto: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};



export const findAllPostUser = async (userId) => {
    return prisma.post.findMany({
        where: {
            userId: parseInt(userId),
        },
        
        orderBy: {
          id: 'desc'  
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
        },
    });
};

export const deleteProfile = async (userId) => {
    return prisma.user.delete({
        where: {
            id: Number(userId)
        }
    });
}   