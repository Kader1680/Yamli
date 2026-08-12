import express from "express";

import {
    getMyProfile,
    getProfile,
    updateProfile,
} from "../controller/profile.controller.js";

import {
    protect,
} from "../middlewares/auth.middmeware.js";

const router = express.Router();

router.get(
    "/me",
    protect,
    getMyProfile
);

router.patch(
    "/me",
    protect,
    updateProfile
);

router.get(
    "/:username",
    getProfile
);

export default router; 