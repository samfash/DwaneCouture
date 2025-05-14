import {
    createProfile,
    createMaleMeasurements,
    createFemaleMeasurements,
    getProfileWithMeasurements,
    getProfile,
    updateProfile,
    updateMaleMeasurements,
    updateFemaleMeasurements,
  } from "./profile.model";
  import { ProfileBase, MaleMeasurements, FemaleMeasurements } from "./profile.types";
  
  export const handleProfileCreation = async (
    profile: ProfileBase,
    measurements: MaleMeasurements | FemaleMeasurements
  ) => {
    const createdProfile = await createProfile(profile);

    if (!createdProfile || !createdProfile.id) {
        throw new Error("Profile creation failed, missing profile ID");
      }
  
    if (createdProfile.gender === "male") {
      await createMaleMeasurements(createdProfile.id!, measurements as MaleMeasurements);
    } else {
      await createFemaleMeasurements(createdProfile.id!, measurements as FemaleMeasurements);
    }
  
    return getProfileWithMeasurements(profile.user_id);
  };
  
  export const fetchUserProfile = async (userId: string) => {
    if (!userId) {
        throw new Error("User ID is required to fetch profile");
      }

    return getProfileWithMeasurements(userId);
  };

  export const updateUserProfileWithMeasurements = async (
    profileId: string,
    data: {
      profile?: Partial<ProfileBase>;
      measurements?: Partial<MaleMeasurements | FemaleMeasurements>;
    }
  ) => {
    let updatedProfile;

    if (!profileId) {
      throw new Error("Profile ID is required for updating");
    }
  
    if (data.profile) {
      updatedProfile = await updateProfile(profileId, data.profile);
    } else {
      updatedProfile = await getProfile(profileId);
      if (!updatedProfile) throw new Error("Profile not found");
    }
  
    if (data.measurements) {
      if (updatedProfile.gender === "male") {
        await updateMaleMeasurements(profileId, data.measurements as Partial<MaleMeasurements>);
      } else {
        await updateFemaleMeasurements(profileId, data.measurements as Partial<FemaleMeasurements>);
      }
    }
  
    return await getProfileWithMeasurements(updatedProfile.user_id);
  };
  