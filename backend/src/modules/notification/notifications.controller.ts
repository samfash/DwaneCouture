import { Request, Response } from "express";
import { createNotificationSchema, updateNotificationSchema } from "./notifications.validation";
import { createNotificationService, getUserNotificationsService, markNotificationReadService, deleteNotificationService } from "./notifications.service";
import logger from "../../core/logger";

export const createNotificationController = async (req: Request, res: Response) => {
  try {
    const parsed = createNotificationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors });
      return ;
    }

    const notification = await createNotificationService(parsed.data);
    res.status(201).json({ notification });
  } catch (error) {
    logger.error(`Create Notification Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserNotificationsController = async (req: Request, res: Response) => {
  try {
    
    const userId = req.body?.user_id || req.user?.id;

    if (!userId){ 
        res.status(401).json({ error: "Unauthorized" });
        return ;
    }

    const notifications = await getUserNotificationsService(userId);
    res.status(200).json({ notifications });
  } catch (error) {
    logger.error(`Get Notifications Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server error" });
  }
};

export const markNotificationAsReadController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId){ 
        res.status(401).json({ error: "Unauthorized" });
        return ;
    }

    await markNotificationReadService(userId, req.params.notificationId);
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    logger.error(`Mark Notification Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteNotificationController = async (req: Request, res: Response) => {
  try {
    const userId = req.body?.user_id || req.user?.id;
    if (!userId){ 
        res.status(401).json({ error: "Unauthorized" });
        return ;
    }

    await deleteNotificationService(userId, req.params.notificationId);
    res.status(200).json({ message: "Notification deleted" });
  } catch (error) {
    logger.error(`Delete Notification Error: ${(error as Error).message}`);
    res.status(500).json({ error: "Server error" });
  }
};
