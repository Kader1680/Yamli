import * as postService from "../services/post.service.js";

export const createPost = async (req, res, next) => {
    try {

        const result =
            await postService.createPost({content: req.body.content, userId: req.user.id});

        res.status(201).json({
            status: "success",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

export const findAllPosts = async (req, res, next) => {
    try {
        const posts =
            await postService.findAllPosts();

        res.status(200).json({
            status: "success",
            data: {
                posts,
            },
        });

    } catch (error) {
        next(error);
    }
};  


export const findPostById = async (req, res, next) => {
    try {
        const post =
            await postService.findPostById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });

    } catch (error) {
        next(error);
    }
};  


export const findPostsByUserId = async (req, res, next) => {
    try {
        const posts =
            await postService.findPostsByUserId(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                posts,
            },
        });

    } catch (error) {
        next(error);
    }
};  


export const updatePost = async (req, res, next) => {
    try {
        const post =
            await postService.updatePost(req.params.id, req.body);

        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        });

    } catch (error) {
        next(error);
    }
};  


export const deletePost = async (req, res, next) => {
    try {
        const post =
            await postService.deletePost(Number(req.params.id));

        res.status(402).json({
            status: "success",
            data: "Post deleted successfully",
        });

    } catch (error) {
        next(error);
    }
};  
