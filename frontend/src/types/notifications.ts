
// --- Payload Types ---
export type CreateNotificationPayload = {
  title: string;
  message: string;
};

// --- Response Types ---
export type Notification = {
  id: string;
  title: string;
  message: string;
  created_at: string;
};

export type NotificationsResponse = {
  notifications: Notification[];
};
