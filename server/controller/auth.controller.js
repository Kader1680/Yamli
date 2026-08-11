import * as authService from "../services/auth.service.js";

export const register = async (req, res, next) => {
    try {

        const result =
            await authService.register(req.body);

        res.status(201).json({
            status: "success",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {

        const result =
            await authService.login(req.body);

        res.cookie(
            "token",
            result.token,
            {
                httpOnly: true,
                secure:
                    process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge:
                    7 * 24 * 60 * 60 * 1000,
            }
        );

        res.status(200).json({
            status: "success",
            token: result.token,
            data: {
                user: result.user,
            },
        });

    } catch (error) {
        next(error);
    }
};