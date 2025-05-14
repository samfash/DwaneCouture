import {
    createProductService,
    deleteProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
  } from "../../../modules/product/product.service";
  
  import * as model from "../../../modules/product/product.model";
  import { CreateProductInput, Product, UpdateProductInput } from "../../../modules/product/product.types";
  
  jest.mock("../../../modules/product/product.model");
  
  const mockProduct: Product = {
    id: "123",
    name: "Peplum Dress",
    description: "Elegant women’s gown",
    category: "female",
    price: 300.0,
    image_url: "https://s3.com/dress.jpg",
    created_at: "2025-04-20T00:00:00Z",
    updated_at: "2025-04-20T00:00:00Z",
  };
  
  describe("🧪 Product Service Tests", () => {
    afterEach(() => jest.clearAllMocks());
  
    it("should create a product", async () => {
      (model.createProduct as jest.Mock).mockResolvedValue(mockProduct);
  
      const input: CreateProductInput = {
        name: mockProduct.name,
        description: mockProduct.description,
        category: mockProduct.category,
        price: mockProduct.price,
        image_url: mockProduct.image_url,
      };
  
      const result = await createProductService(input);
      expect(result).toEqual(mockProduct);
      expect(model.createProduct).toHaveBeenCalledWith(input);
    });
  
    it("should return all products", async () => {
      (model.getAllProducts as jest.Mock).mockResolvedValue([mockProduct]);
      const result = await getAllProductsService();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Peplum Dress");
    });
  
    it("should return a product by ID", async () => {
      (model.getProductById as jest.Mock).mockResolvedValue(mockProduct);
      const result = await getProductByIdService("123");
      expect(result?.id).toBe("123");
    });
  
    it("should update a product", async () => {
      const update: UpdateProductInput = { price: 320 };
      (model.updateProduct as jest.Mock).mockResolvedValue({ ...mockProduct, price: 320 });
      const result = await updateProductService("123", update);
      expect(result?.price).toBe(320);
    });
  
    it("should delete a product", async () => {
      (model.deleteProduct as jest.Mock).mockResolvedValue(true);
      const result = await deleteProductService("123");
      expect(result).toBe(true);
    });
  });
  