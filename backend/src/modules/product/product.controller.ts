import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
} from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.validation";
import logger from "../../core/logger";
import { uploadToS3, generateSignedUrl } from "../../core/s3Uploader";

export const createProductController = async (req: Request, res: Response) => {
  try {
    console.log("Received init:", req.body);
    const image_url = req.file ? await uploadToS3(req.file) : undefined;
    req.body.image_url = image_url || ""; // Provide a default empty string if image_url is undefined

    console.log("Received body:", req.body);
    const validated = createProductSchema.parse({
      ...req.body,
      price: Number(req.body.price),
      image_url
    });

    const product = await createProductService(validated);
    res.status(201).json(product);
  } catch (err: any) {
    logger.error("❌ Error creating product:", err);
    res.status(400).json({ error: err.message });
  }
};

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as "male" | "female" | undefined;

    if (category && category !== "male" && category !== "female") {
      res.status(400).json({ error: "Invalid category. Must be 'male' or 'female'." });
      return ;
    }

    const products = await getAllProductsService(category);
    res.status(200).json(products);
  } catch (err: any) {
    logger.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductByIdController = async (req: Request, res: Response) => {
  try {
    const product = await getProductByIdService(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return ;
    }
    res.status(200).json(product);
  } catch (err: any) {
    logger.error("❌ Error fetching product:", err.message);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const existingProduct = await getProductByIdService(productId);

    if (!existingProduct) {
      res.status(404).json({ error: "Product not found" });
      return ;
    }

    const image_url = req.file ? await uploadToS3(req.file) : existingProduct.image_url;
    
    const validated = updateProductSchema.parse({
      ...req.body,
      price:  req.body.price ? Number(req.body.price) : undefined,
      image_url
    });

    const updated = await updateProductService(productId, validated);
    if (!updated) {
        res.status(404).json({ error: "Product not found" });
        return;
    }
    
    res.status(200).json(updated);
  } catch (err: any) {
    logger.error("❌ Error updating product:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  try {
    const success = await deleteProductService(req.params.id);
    if (!success) {
      res.status(404).json({ error: "Product not found" });
      return ;
    }
    res.status(204).send(); // No content
  } catch (err: any) {
    logger.error("❌ Error deleting product:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

export const getSignedUrlController = async (req: Request, res: Response) => {
  try {
    const signedUrl = await generateSignedUrl(req.params.key);
    res.json({ url: signedUrl });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate signed URL" });
    logger.error("Failed to generate signed URL", error);
  }
}
