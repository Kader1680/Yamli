import prisma from "../config/prisma.js";

export const findFriendship = async (userId1, userId2) => {
    return prisma.friendship.findFirst({
        where: {
            OR: [
                {
                    senderId: userId1,
                    receiverId: userId2,
                },
                {
                    senderId: userId2,
                    receiverId: userId1,
                },
            ],
        },
    });
};


export const createFriendRequest = async (senderId, receiverId) => {
    return prisma.friendship.create({
        data: {
            senderId,
            receiverId,
            status: "PENDING",
        },
    });
};


export const findFriendshipById = async (friendshipId) => {
    return prisma.friendship.findUnique({
        where: {
            id: Number(friendshipId),
        },
    });
};


export const updateFriendshipStatus = async (friendshipId, status) => {
    return prisma.friendship.update({
        where: {
            id: Number(friendshipId),
        },
        data: {
            status,
        },
    });
};


export const deleteFriendship = async (friendshipId) => {
    return prisma.friendship.delete({
        where: {
            id: Number(friendshipId),
        },
    });
};


export const findReceivedPendingRequests = async (userId) => {
    return prisma.friendship.findMany({
        where: {
            receiverId: userId,
            status: "PENDING",
        },
        include: {
            sender: {
                select: {
                    id: true,
                    username: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};