import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct, } from "./product.model";
import logger from "../../core/logger";
// ✅ Create product
export const createProductService = async (data) => {
    try {
        return await createProduct(data);
    }
    catch (err) {
        logger.error("❌ Failed to create product:", err);
        throw new Error("Product creation failed");
    }
};
// ✅ Get all products
export const getAllProductsService = async (category) => {
    return await getAllProducts(category);
};
// ✅ Get single product
export const getProductByIdService = async (id) => {
    return await getProductById(id);
};
// ✅ Update product
export const updateProductService = async (id, updates) => {
    try {
        return await updateProduct(id, updates);
    }
    catch (err) {
        logger.error("❌ Failed to update product:", err);
        throw new Error("Product update failed");
    }
};
// ✅ Delete product
export const deleteProductService = async (id) => {
    try {
        return await deleteProduct(id);
    }
    catch (err) {
        logger.error("❌ Failed to delete product:", err);
        throw new Error("Product deletion failed");
    }
};
