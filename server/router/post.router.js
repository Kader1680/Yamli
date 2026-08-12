import express from "express";

import * as postController from "../controller/post.controller.js";

import {
    protect,
} from "../middlewares/auth.middmeware.js";

const router = express.Router();


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage });
 router.post('/', protect, postController.createPost);
 router.get('/', postController.findAllPosts);
 router.get('/api/post/:id', protect, postController.findPostsByUserId);
 router.put('/api/post/:id', protect, postController.updatePost);
 router.delete('/api/post/:id', protect, postController.deletePost);
 
export default router;
