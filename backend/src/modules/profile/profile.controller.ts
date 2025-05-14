import { Request, Response } from "express";
import {
  handleProfileCreation,
  fetchUserProfile,
  updateUserProfileWithMeasurements,
} from "./profile.service";
import { profileSchema, 
  maleMeasurementsSchema, 
  femaleMeasurementsSchema, 
  updateMaleMeasurementsSchema, 
  updateFemaleMeasurementsSchema 
} from "./profile.validation";
import logger from "../../core/logger";

export const createProfileController = async (req: Request, res: Response) => {
  try {
    const profileParse = profileSchema.safeParse(req.body.profile);
    if (!profileParse.success) {
      logger.warn("❌ Invalid profile input", profileParse.error);
      res.status(400).json({ error: profileParse.error.flatten() });
      return;
    }

    const gender = req.body.profile.gender;
    const measurementsParse =
      gender === "male"
        ? maleMeasurementsSchema.safeParse(req.body.measurements)
        : femaleMeasurementsSchema.safeParse(req.body.measurements);

    if (!measurementsParse.success) {
      logger.warn(`❌ Invalid ${gender} measurements input`, measurementsParse.error);
      res.status(400).json({ error: measurementsParse.error.flatten() });
      return ;
    }

    const data = await handleProfileCreation(profileParse.data, measurementsParse.data);
    res.status(201).json(data);
    return ;
  } catch (err) {
    logger.error("❌ Server error in createProfileController", err);
    res.status(500).json({ error: "Server error" });
    return ;
  }
};

export const getProfileController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      logger.warn("⚠️ User ID is undefined");
      res.status(400).json({ error: "User ID is required" });
      return ;
    }
    const data = await fetchUserProfile(userId);
    if (!data) {
      logger.warn("⚠️ Profile not found for user:", userId);
      res.status(404).json({ error: "Profile not found" });
      return ;
    }
    res.status(200).json(data);
    return ;
  } catch (err) {
    logger.error("❌ Failed to fetch profile", err);
    res.status(500).json({ error: "Failed to fetch profile" });
    return ;
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const profileId = req.params.id;
    const updates = req.body;

    if (updates.measurements) {
      const gender = updates.profile?.gender || req.body.gender;
      const validation =
        gender === "male"
          ? updateMaleMeasurementsSchema.safeParse(updates.measurements)
          : updateFemaleMeasurementsSchema.safeParse(updates.measurements);

      if (!validation.success) {
        logger.warn("❌ Measurements validation failed", validation.error.format());
        res.status(400).json({ error: validation.error.errors });
        return ;
      }
    }

    const updated = await updateUserProfileWithMeasurements(profileId, updates);
    res.status(200).json(updated);
    return ;
  } catch (err) {
    logger.error("❌ Failed to update profile and measurements", err);
    res.status(500).json({ error: "Failed to update profile" });
    return ;
  }
};