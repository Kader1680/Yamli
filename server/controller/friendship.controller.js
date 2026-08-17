import {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend as removeFriendService,
    getFriendRequests,
} from "../services/friendship.service.js";


export const sendRequest = async (req, res, next) => {
    try {

        const senderId = req.user.id;
        const { receiverId } = req.body;


        const friendship = await sendFriendRequest(
            senderId,
            Number(receiverId)
        );


        return res.status(201).json({
            message: "Friend request sent successfully",
            data: friendship,
        });

    } catch (error) {
        next(error);
    }
};


export const acceptRequest = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const friendshipId = Number(req.params.id);


        const friendship = await acceptFriendRequest(
            friendshipId,
            userId
        );


        return res.status(200).json({
            message: "Friend request accepted successfully",
            data: friendship,
        });

    } catch (error) {
        next(error);
    }
};


export const rejectRequest = async (req, res, next) => {
    try {

        const userId = req.user.id;
        const friendshipId = Number(req.params.id);


        const friendship = await rejectFriendRequest(
            friendshipId,
            userId
        );


        return res.status(200).json({
            message: "Friend request rejected",
            data: friendship,
        });

    } catch (error) {
        next(error);
    }
};


 

export const removeFriend = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const friendshipId = Number(req.params.id);

        await removeFriendService(friendshipId, userId);

        return res.status(200).json({
            message: "Friend removed successfully",
        });

    } catch (error) {
        next(error);
    }
};


export const getRequests = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const requests = await getFriendRequests(userId);

        return res.status(200).json({
            data: requests,
        });

    } catch (error) {
        next(error);
    }
};