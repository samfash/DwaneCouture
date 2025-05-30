import { fetcher } from './api';

export const createNotification = (token: string, title: string, message: string) =>
  fetcher('/api/notifications', 'POST', { title, message }, token);

export const fetchNotifications = (token: string) =>
  fetcher('/api/notifications', 'GET', undefined, token);

export const markNotificationRead = (token: string, id: string) =>
  fetcher(`/api/notifications/${id}/read`, 'PATCH', undefined, token);

export const deleteNotification = (token: string, id: string) =>
  fetcher(`/api/notifications/${id}`, 'DELETE', undefined, token);
export const deleteAllNotifications = (token: string) =>
  fetcher('/api/notifications', 'DELETE', undefined, token);