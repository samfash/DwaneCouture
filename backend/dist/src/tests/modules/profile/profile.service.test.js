import { handleProfileCreation, fetchUserProfile, updateUserProfileWithMeasurements } from '../../../modules/profile/profile.service';
import { createProfile, createMaleMeasurements, createFemaleMeasurements, getProfileWithMeasurements, updateProfile, updateMaleMeasurements, getProfile } from '../../../modules/profile/profile.model';
// Mock the functions from profile.model
jest.mock('../../../modules/profile/profile.model', () => ({
    createProfile: jest.fn(),
    createMaleMeasurements: jest.fn(),
    createFemaleMeasurements: jest.fn(),
    getProfileWithMeasurements: jest.fn(),
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
    updateMaleMeasurements: jest.fn(),
}));
const mockProfile = {
    id: "profile-1",
    user_id: "user-1",
    full_name: "John Doe",
    gender: 'male',
    delivery_address: "123 Street"
};
const mockMaleMeasurements = {
    profile_id: 'profile-1',
    neck: 15.5,
    chest: 40.0,
    waist: 32.0,
    hips: 38.0,
    shoulder: 18.0,
};
describe('Profile Service', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // ✅ Clears mock call counts
    });
    describe('handleProfileCreation', () => {
        it('should create a profile and measurements for male', async () => {
            const profile = {
                user_id: 'user1',
                full_name: 'John Doe',
                gender: 'male',
                delivery_address: '123 Main St',
            };
            const measurements = {
                profile_id: 'profile1',
                neck: 15.5,
                chest: 40,
                waist: 32,
                hips: 38,
                shoulder: 18,
                thigh: 22,
                sleeve_length: 25,
                round_sleeve: 14,
                wrist: 7,
                shirt_length: 30,
                trouser_length: 32,
            };
            const createdProfile = { id: 'profile1', gender: 'male', user_id: 'user1' };
            const profileWithMeasurements = { ...createdProfile, measurements };
            // Mock the return values of the functions
            createProfile.mockResolvedValue(createdProfile);
            createMaleMeasurements.mockResolvedValue(true);
            getProfileWithMeasurements.mockResolvedValue(profileWithMeasurements);
            const result = await handleProfileCreation(profile, measurements);
            expect(createProfile).toHaveBeenCalledWith(profile);
            expect(createMaleMeasurements).toHaveBeenCalledWith('profile1', measurements);
            expect(getProfileWithMeasurements).toHaveBeenCalledWith('user1');
            expect(result).toEqual(profileWithMeasurements);
        });
        it('should create a profile and measurements for female', async () => {
            const profile = {
                user_id: 'user2',
                full_name: 'Jane Doe',
                gender: 'female',
                delivery_address: '456 Elm St',
            };
            const measurements = {
                profile_id: 'profile2',
                burst: 34,
                waist: 28,
                hips: 36,
                full_length: 50,
                shoulder: 15,
                nipple_to_nipple: 10,
                shoulder_to_under_burst: 8,
                half_length: 22,
                thigh: 21,
                round_sleeve: 12,
                wrist: 6,
                sleeve_length: 24,
                shirt_length: 28,
                trouser_length: 30,
            };
            const createdProfile = { id: 'profile2', gender: 'female', user_id: 'user2' };
            const profileWithMeasurements = { ...createdProfile, measurements };
            // Mock the return values of the functions
            createProfile.mockResolvedValue(createdProfile);
            createFemaleMeasurements.mockResolvedValue(true);
            getProfileWithMeasurements.mockResolvedValue(profileWithMeasurements);
            const result = await handleProfileCreation(profile, measurements);
            expect(createProfile).toHaveBeenCalledWith(profile);
            expect(createFemaleMeasurements).toHaveBeenCalledWith('profile2', measurements);
            expect(getProfileWithMeasurements).toHaveBeenCalledWith('user2');
            expect(result).toEqual(profileWithMeasurements);
        });
        it('should throw an error if profile creation fails', async () => {
            const profile = {
                user_id: 'user3',
                full_name: 'Sam Smith',
                gender: 'male',
                delivery_address: '789 Oak St',
            };
            const measurements = {
                profile_id: 'profile3',
                neck: 15.5,
                chest: 40,
                waist: 32,
                hips: 38,
                shoulder: 18,
                thigh: 22,
                sleeve_length: 25,
                round_sleeve: 14,
                wrist: 7,
                shirt_length: 30,
                trouser_length: 32,
            };
            // Mock that createProfile returns null
            createProfile.mockResolvedValue(null);
            await expect(handleProfileCreation(profile, measurements)).rejects.toThrowError('Profile creation failed, missing profile ID');
        });
    });
    describe('fetchUserProfile', () => {
        it('should fetch user profile with measurements', async () => {
            const userId = 'user1';
            const profileWithMeasurements = { user_id: 'user1', full_name: 'John Doe', gender: 'male', measurements: {} };
            getProfileWithMeasurements.mockResolvedValue(profileWithMeasurements);
            const result = await fetchUserProfile(userId);
            expect(getProfileWithMeasurements).toHaveBeenCalledWith(userId);
            expect(result).toEqual(profileWithMeasurements);
        });
        it('should throw an error if user ID is not provided', async () => {
            await expect(fetchUserProfile('')).rejects.toThrowError('User ID is required to fetch profile');
        });
    });
    describe('updateUserProfile', () => {
        it("should update profile and male measurements", async () => {
            const updatedProfile = { ...mockProfile, full_name: "Updated Name" };
            updateProfile.mockResolvedValue(updatedProfile);
            updateMaleMeasurements.mockResolvedValue(undefined);
            getProfileWithMeasurements.mockResolvedValue({ profile: updatedProfile, measurements: mockMaleMeasurements });
            const result = await updateUserProfileWithMeasurements("profile-1", {
                profile: { full_name: "Updated Name" },
                measurements: mockMaleMeasurements,
            });
            expect(result?.profile?.full_name).toBe("Updated Name");
            expect(updateProfile).toHaveBeenCalled();
            expect(updateMaleMeasurements).toHaveBeenCalledWith("profile-1", mockMaleMeasurements);
        });
        it("should update only measurements if profile is not provided", async () => {
            getProfileWithMeasurements.mockResolvedValue({ profile: mockProfile, measurements: mockMaleMeasurements });
            getProfile.mockResolvedValue(mockProfile);
            updateMaleMeasurements.mockResolvedValue(undefined);
            const result = await updateUserProfileWithMeasurements("profile-1", {
                measurements: mockMaleMeasurements
            });
            expect(updateMaleMeasurements).toHaveBeenCalled();
            expect(result?.profile).toEqual(mockProfile);
        });
        it("should throw error if update has no profile and user does not exist", async () => {
            getProfile.mockResolvedValue(null);
            await expect(updateUserProfileWithMeasurements("invalid-id", { measurements: mockMaleMeasurements }))
                .rejects.toThrow("Profile not found");
        });
        it("should not call updateMeasurement if measurement is not provided", async () => {
            const updatedProfile = { ...mockProfile, full_name: "Updated Name" };
            updateProfile.mockResolvedValue(updatedProfile);
            getProfileWithMeasurements.mockResolvedValue({ profile: updatedProfile, measurements: undefined });
            const result = await updateUserProfileWithMeasurements("profile-1", {
                profile: { full_name: "Updated Name" }
            });
            expect(updateProfile).toHaveBeenCalled();
            expect(updateMaleMeasurements).not.toHaveBeenCalled();
            expect(result?.profile.full_name).toBe("Updated Name");
        });
    });
});
