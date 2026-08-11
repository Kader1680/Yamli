import prisma from "../config/prisma.js";

export const findByEmail = (email) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const findByUsername = (username) => {
    return prisma.user.findUnique({
        where: {
            username,
        },
    });
};

export const findByEmailOrUsername = (email, username) => {
    return prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username },
            ],
        },
    });
};

export const findById = (id) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};

export const createUser = (data) => {
    return prisma.user.create({
        data,
    });
};

export const findAllUsers = () => {
    return prisma.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            bio: true,
            coverPhoto: true,
            createdAt: true,
        },
    });
};