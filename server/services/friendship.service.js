import {
    findFriendship,
    createFriendRequest,
    findFriendshipById,
    updateFriendshipStatus,
    deleteFriendship,
    findReceivedPendingRequests,
} from "../repositories/friendship.repository.js";


export const sendFriendRequest = async (senderId, receiverId) => {

    if (senderId === receiverId) {
        throw new Error("You cannot send a friend request to yourself");
    }


    const existingFriendship = await findFriendship(
        senderId,
        receiverId
    );


    if (existingFriendship) {
        throw new Error("Friendship relationship already exists");
    }


    return createFriendRequest(senderId, receiverId);
};


export const acceptFriendRequest = async (friendshipId, userId) => {

    const friendship = await findFriendshipById(friendshipId);


    if (!friendship) {
        throw new Error("Friend request not found");
    }


    if (friendship.receiverId !== userId) {
        throw new Error("You are not allowed to accept this request");
    }


    if (friendship.status !== "PENDING") {
        throw new Error("This request is no longer pending");
    }


    return updateFriendshipStatus(
        friendshipId,
        "ACCEPTED"
    );
};


export const rejectFriendRequest = async (friendshipId, userId) => {

    const friendship = await findFriendshipById(friendshipId);


    if (!friendship) {
        throw new Error("Friend request not found");
    }


    if (friendship.receiverId !== userId) {
        throw new Error("You are not allowed to reject this request");
    }


    if (friendship.status !== "PENDING") {
        throw new Error("This request is no longer pending");
    }


    return updateFriendshipStatus(
        friendshipId,
        "REJECTED"
    );
};


export const removeFriend = async (friendshipId, userId) => {

    const friendship = await findFriendshipById(friendshipId);


    if (!friendship) {
        throw new Error("Friendship not found");
    }


    if (
        friendship.senderId !== userId &&
        friendship.receiverId !== userId
    ) {
        throw new Error("You are not allowed to remove this friendship");
    }


    return deleteFriendship(friendshipId);
};


export const getFriendRequests = async (userId) => {
    return findReceivedPendingRequests(userId);
};