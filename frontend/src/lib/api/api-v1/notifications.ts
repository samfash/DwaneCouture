import { fetcher } from './api';

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
}

export const createNotification = (title: string, message: string) =>{
  fetcher('/api/notifications', 'POST', { title, message });}

export const fetchNotifications =  async (): Promise<{notifications: Notification[]}> =>{
 const res = await fetcher('/api/notifications', 'GET', undefined);
return res as {notifications: Notification[]};
}

export const markNotificationRead = (id: string) =>
  fetcher(`/api/notifications/${id}/read`, 'PATCH', undefined);

export const deleteNotification = ( id: string) =>
  fetcher(`/api/notifications/${id}`, 'DELETE', undefined);
export const deleteAllNotifications = () =>
  fetcher('/api/notifications', 'DELETE', undefined);