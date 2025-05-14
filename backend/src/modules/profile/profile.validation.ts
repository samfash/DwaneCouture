import { z } from "zod";

export const profileSchema = z.object({
  user_id: z.string().uuid(),
  full_name: z.string().min(2),
  gender: z.enum(["male", "female"]),
  delivery_address: z.string().min(5),
});

export const maleMeasurementsSchema = z.object({
    profile_id: z.string().uuid().optional(),
    neck: z.number().min(1),
    chest: z.number().min(1),
    waist: z.number().min(1),
    hips: z.number().min(1),
    shoulder: z.number().min(1).optional(),
    thigh: z.number().min(1).optional(),
    sleeve_length: z.number().min(1).optional(),
    round_sleeve: z.number().min(1).optional(),
    wrist: z.number().min(1).optional(),
    shirt_length: z.number().min(1).optional(),
    trouser_length: z.number().min(1).optional(),
});

  export const femaleMeasurementsSchema = z.object({
    profile_id: z.string().uuid(),
    burst: z.number().min(1),
    waist: z.number().min(1),
    hips: z.number().min(1),
    full_length: z.number().min(1),
    shoulder: z.number().min(1).optional(),
    nipple_to_nipple: z.number().min(1).optional(),
    shoulder_to_under_burst: z.number().min(1).optional(),
    half_length: z.number().min(1).optional(),
    thigh: z.number().min(1).optional(),
    round_sleeve: z.number().min(1).optional(),
    wrist: z.number().min(1).optional(),
    sleeve_length: z.number().min(1).optional(),
    shirt_length: z.number().min(1).optional(),
    trouser_length: z.number().min(1).optional(),
});

export const updateMaleMeasurementsSchema = maleMeasurementsSchema.partial();
export const updateFemaleMeasurementsSchema = femaleMeasurementsSchema.partial();
