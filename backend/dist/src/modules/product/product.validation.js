import { z } from "zod";
export const createProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    category: z.enum(["male", "female"]),
    price: z.number().positive("Price must be greater than 0"),
    image_url: z.string().url("Must be a valid image URL"),
});
export const updateProductSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    category: z.enum(["male", "female"]).optional(),
    price: z.coerce.number().positive().optional(),
    image_url: z.string().url().optional(),
});
