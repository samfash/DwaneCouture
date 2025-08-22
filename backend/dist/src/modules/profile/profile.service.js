import { createProfile, createMaleMeasurements, createFemaleMeasurements, getProfileWithMeasurements, getProfile, updateProfile, updateMaleMeasurements, updateFemaleMeasurements, } from "./profile.model";
export const handleProfileCreation = async (profile, measurements) => {
    const createdProfile = await createProfile(profile);
    if (!createdProfile || !createdProfile.id) {
        throw new Error("Profile creation failed, missing profile ID");
    }
    if (createdProfile.gender === "male") {
        await createMaleMeasurements(createdProfile.id, measurements);
    }
    else {
        await createFemaleMeasurements(createdProfile.id, measurements);
    }
    return getProfileWithMeasurements(profile.user_id);
};
export const fetchUserProfile = async (userId) => {
    if (!userId) {
        throw new Error("User ID is required to fetch profile");
    }
    return getProfileWithMeasurements(userId);
};
export const updateUserProfileWithMeasurements = async (profileId, data) => {
    let updatedProfile;
    if (!profileId) {
        throw new Error("Profile ID is required for updating");
    }
    if (data.profile) {
        updatedProfile = await updateProfile(profileId, data.profile);
    }
    else {
        updatedProfile = await getProfile(profileId);
        if (!updatedProfile)
            throw new Error("Profile not found");
    }
    if (data.measurements) {
        if (updatedProfile.gender === "male") {
            await updateMaleMeasurements(profileId, data.measurements);
        }
        else {
            await updateFemaleMeasurements(profileId, data.measurements);
        }
    }
    return await getProfileWithMeasurements(updatedProfile.user_id);
};
