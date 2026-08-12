import prisma from "../config/prisma.js";
 

export const createPost = async ({ content, userId }) => {
    return prisma.post.create({
        data: {
            content,
            userId,
        },
    });
};

export const findAllPosts = async () => {
    return prisma.post.findMany();
}

export const findPostById = async (postId) => {
    return prisma.post.findUnique({
        where: {
            id: postId
        }
    });
}   
export const findPostsByUserId = async (userId) => {
    return prisma.post.findMany({
        where: {
            userId: userId
        }
    });
}   
export const updatePost = async (postId, data) => {
    return prisma.post.update({
        where: {
            id: postId
        },
        data,
    });
}
export const deletePost = async (postId) => {
    return prisma.post.delete({
        where: {
            id: postId
        }
    });
}   