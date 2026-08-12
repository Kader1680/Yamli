import * as postRepository from "../repositories/post.repository.js";

export const createPost = async ({content, userId}) => {
    return postRepository.createPost({
        content,
        userId: userId,
    });
}

export const findAllPosts = async () => {
    return postRepository.findAllPosts();
}

export const findPostById = async (postId) => {
    return postRepository.findPostById(postId);
}

export const findPostsByUserId = async (userId) => {
    return postRepository.findPostsByUserId(userId);
}

export const updatePost = async (postId, data) => {
    return postRepository.updatePost(postId, data);
}

export const deletePost = async (postId) => {
    return postRepository.deletePost(postId);
}