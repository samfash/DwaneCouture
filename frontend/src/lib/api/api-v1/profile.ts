import { fetcher } from './api';

export const createProfile = (profile: unknown, measurements: unknown) =>
  fetcher(`/api/profiles`, 'POST', { profile, measurements });

export const getProfile = (userId: string) =>
  fetcher(`/api/profiles?userId=${userId}`, 'GET');

export const updateProfile = (profileId: string, data: unknown) =>
  fetcher(`/api/profiles/${profileId}`, 'PATCH', data);
