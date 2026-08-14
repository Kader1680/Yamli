import * as profileRepository
    from "../repositories/profile.repository.js";

export const getMyProfile = async (userId) => {
    const profile =
        await profileRepository.findProfileById(userId);

    if (!profile) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return profile;
};

// export const getProfileByUsername = async (username) => {
//     const profile =
//         await profileRepository.findProfileByUsername(
//             username
//         );

//     if (!profile) {
//         const error = new Error("User not found");
//         error.statusCode = 404;
//         throw error;
//     }

//     return profile;
// };

export const updateProfile = async (userId, data) => {

    const allowedFields = {
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        bio: data.bio,
        coverPhoto: data.coverPhoto,
    };

    const cleanData = Object.fromEntries(
        Object.entries(allowedFields)
            .filter(([_, value]) => value !== undefined)
    );

    return profileRepository.updateProfile(
        userId,
        cleanData
    );
};

export const findAllPostUser = async (userId) => {

    return profileRepository.findAllPostUser(userId);
};


export const deleteProfile = async (userId) => {

    return profileRepository.deleteProfile(userId);
};



