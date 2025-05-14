import { registerValidation } from "../../../modules/auth/auth.validation";

describe("Auth Validation - Register Schema", () => {
  it("should validate a correct email and password", () => {
    const validData = { email: "valid@example.com", password: "Strong@123" };
    expect(registerValidation.parse(validData)).toEqual(validData);
  });

  it("should reject an invalid email", () => {
    const invalidData = { email: "invalid-email", password: "Strong@123" };
    expect(() => registerValidation.parse(invalidData)).toThrow("Invalid email format");
  });

  it("should reject a weak password", () => {
    const invalidData = { email: "valid@example.com", password: "weakpas" };
    expect(() => registerValidation.parse(invalidData)).toThrow("Password must be at least 8 characters long");
  });

  it("should reject a password without uppercase letters", () => {
    const invalidData = { email: "valid@example.com", password: "strongpassword1!" };
    expect(() => registerValidation.parse(invalidData)).toThrow("Password must contain at least one uppercase letter");
  });

  it("should reject a password without numbers", () => {
    const invalidData = { email: "valid@example.com", password: "StrongPassword!" };
    expect(() => registerValidation.parse(invalidData)).toThrow("Password must contain at least one number");
  });

  it("should reject a password without special characters", () => {
    const invalidData = { email: "valid@example.com", password: "StrongPassword1" };
    expect(() => registerValidation.parse(invalidData)).toThrow("Password must contain at least one special character");
  });
});
