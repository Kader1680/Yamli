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


export const findAllPostUser = async (req, res, next) => {
    try {

        const allPostsUser =
            await profileService.findAllPostUser(
                req.user.id
            );

        res.status(200).json({
            status: "success",
            data: {
                allPostsUser,
            },
        });

    } catch (error) {
        next(error);
    }
}; 

export const deleteProfile = async (req, res, next) => {
    try {
        const profileId = req.params.id;
        const deleteProfile =
            await profileService.deleteProfile(
                profileId
            );

        res.status(401).json({
            status: "success",
            
        });

    } catch (error) {
        next(error);
    }
}; 
