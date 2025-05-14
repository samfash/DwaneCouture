import { createProductSchema, updateProductSchema } from "../../../modules/product/product.validation";

describe("🧪 Product Validation Tests", () => {
  it("should pass valid product creation", () => {
    const input = {
      name: "Native Wear",
      description: "Made for men",
      category: "male",
      price: 200,
      image_url: "https://s3.com/native.jpg",
    };

    expect(() => createProductSchema.parse(input)).not.toThrow();
  });

  it("should fail creation with invalid price", () => {
    const input = {
      name: "Shirt",
      category: "male",
      price: -5,
      image_url: "invalid-url",
    };

    const result = createProductSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("should allow partial updates", () => {
    const input = { price: 450.99 };
    expect(() => updateProductSchema.parse(input)).not.toThrow();
  });

  it("should fail update with invalid category", () => {
    const input = { category: "kids" }; // invalid
    const result = updateProductSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});
