import * as userRepository from "../repositories/user.repository.js";
import {
    hashPassword,
    comparePassword,
} from "../utils/password.js";
import {
    signToken,
} from "../utils/jwt.js";
import { sanitizeUser } from "../utils/user.js";

export const register = async ({
    firstName,
    lastName,
    username,
    email,
    password,
}) => {

    const existingUser =
        await userRepository.findByEmailOrUsername(
            email,
            username
        );

    if (existingUser) {
        throw new Error(
            "Email or username already exists"
        );
    }

    const hashedPassword =
        await hashPassword(password);

    const user =
        await userRepository.createUser({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        });

    const token = signToken(user.id);

    return {
        token,
        user: sanitizeUser(user),
    };
};


export const login = async ({
    email,
    password,
}) => {

    const user =
        await userRepository.findByEmail(email);

    if (!user) {
        throw new Error(
            "Incorrect email or password"
        );
    }

    const passwordCorrect =
        await comparePassword(
            password,
            user.password
        );

    if (!passwordCorrect) {
        throw new Error(
            "Incorrect email or password"
        );
    }

    const token = signToken(user.id);

    return {
        token,
        user: sanitizeUser(user),
    };
};

export const getUserById = async (id) => {

    const user =
        await userRepository.findById(id);

    if (!user) {
        throw new Error(
            "User no longer exists"
        );
    }

    return sanitizeUser(user);
};