import * as profileService
    from "../services/profile.service.js";

export const getMyProfile = async (req, res, next) => {
    try {

        const profile =
            await profileService.getMyProfile(
                req.user.id
            );

        res.status(200).json({
            status: "success",
            data: {
                profile,
            },
        });

    } catch (error) {
        next(error);
    }
};


export const getProfile = async (req, res, next) => {
    try {

        const profile =
            await profileService.getProfileByUsername(
                req.params.username
            );

        res.status(200).json({
            status: "success",
            data: {
                profile,
            },
        });

    } catch (error) {
        next(error);
    }
};  


export const updateProfile = async (req, res, next) => {
    try {

        const profile =
            await profileService.updateProfile(
                req.user.id,
                req.body
            );

        res.status(200).json({
            status: "success",
            data: {
                profile,
            },
        });

    } catch (error) {
        next(error);
    }
}; 