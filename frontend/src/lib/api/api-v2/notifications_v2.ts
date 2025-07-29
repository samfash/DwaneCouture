import { fetcher } from './api_v2';
import { NotificationsResponse, CreateNotificationPayload } from '@/src/types/notifications';
// --- API Functions ---

export const createNotification = (data: CreateNotificationPayload) =>
  fetcher.post<Notification>('/api/notifications',data);

export const fetchNotifications = (): Promise<NotificationsResponse> =>
  fetcher.get<NotificationsResponse>('/api/notifications');

export const markNotificationRead = (id: string) =>
  fetcher.patch(`/api/notifications/${id}/read`);

export const deleteNotification = (id: string) =>
  fetcher.delete(`/api/notifications/${id}`);

export const deleteAllNotifications = () =>
  fetcher.delete('/api/notifications');
