import { fetcher } from './api_v2';
import { ProfilePayload, MeasurementsPayload, ProfileResponse } from '@/src/types/profile';

// --- API functions ---
export const createProfile = (
  profile: ProfilePayload,
  measurements: MeasurementsPayload
) =>
  fetcher.post<ProfileResponse>(`/api/profiles`,{ profile, measurements });

export const getProfile = (userId: string) =>
  fetcher.get<ProfileResponse>(`/api/profiles?userId=${userId}`);

export const updateProfile = (
  profileId: string,
  data: Partial<ProfilePayload & { measurements?: MeasurementsPayload }>
) =>
  fetcher.patch<ProfileResponse>(`/api/profiles/${profileId}`, data);
