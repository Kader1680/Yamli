import express from "express";

import {
    getMyProfile,
    updateProfile,
    deleteProfile,  
    findAllPostUser
} from "../controller/profile.controller.js";

import {
    protect,
} from "../middlewares/auth.middmeware.js";

const router = express.Router();

router.get(
    "/me",
    protect,
    getMyProfile,
    findAllPostUser,


);

router.patch(
    "/me",
    protect,
    updateProfile,
    deleteProfile

);

router.get(
    "/:username",
    protect,
    findAllPostUser
);

router.get(
    "/allposts",
    protect,
    findAllPostUser
);
router.delete(
    "/delete/:id",
    protect,
    deleteProfile

);

 
export default router; 