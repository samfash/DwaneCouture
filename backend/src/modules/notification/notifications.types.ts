export interface NotificationBase {
    id: string;
    user_id: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: Date;
}
  
export interface CreateNotificationInput {
    title: string;
    message: string;
    user_id: string
}
  
export interface UpdateNotificationInput {
    is_read?: boolean;
}
  