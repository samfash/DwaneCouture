import { fetcher } from './api';

export const createProfile = (token: string, profile: unknown, measurements: unknown) =>
  fetcher(`/api/profiles`, 'POST', { profile, measurements }, token);

export const getProfile = (token: string, userId: string) =>
  fetcher(`/api/profiles`, 'GET', { users: { id: userId } }, token);

export const updateProfile = (token: string, profileId: string, data: unknown) =>
  fetcher(`/api/profiles/${profileId}`, 'PATCH', data, token);
