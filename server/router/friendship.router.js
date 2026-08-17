import express from "express";

import {
    sendRequest,
    acceptRequest,
    rejectRequest,
    removeFriend,
    getRequests,
} from "../controller/friendship.controller.js";

import {
    protect,
} from "../middlewares/auth.middmeware.js";


const router = express.Router();

router.post(
    "/request",
    protect,
    sendRequest
);


router.patch(
    "/:id/accept",
    protect,
    acceptRequest
);


router.patch(
    "/:id/reject",
    protect,
    rejectRequest
);


router.delete(
    "/:id",
    protect,
    removeFriend
);

router.get(
    "/requests",
    protect,
    getRequests
);

export default router;