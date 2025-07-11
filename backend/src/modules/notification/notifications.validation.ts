import { z } from "zod";

export const createNotificationSchema = z.object({
  title: z.string().min(1),
  message: z.string().min(1),
  user_id: z.string().uuid(),
});

export const updateNotificationSchema = z.object({
  is_read: z.boolean(),
});
