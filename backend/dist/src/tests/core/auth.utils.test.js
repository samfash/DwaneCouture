import { generateToken, verifyToken } from "../../core/auth.utils";
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });
describe("Auth Utils - Token Generation & Verification", () => {
    let validToken;
    const mockPayload = { id: "user123", email: "test@example.com", role: "user" };
    beforeAll(() => {
        validToken = generateToken(mockPayload);
    });
    it("should generate a valid JWT token", () => {
        expect(validToken).toBeDefined();
        expect(typeof validToken).toBe("string");
    });
    it("should verify a valid JWT token", () => {
        const decoded = verifyToken(validToken);
        expect(decoded).toMatchObject(mockPayload);
    });
    it("should return null for an invalid JWT token", () => {
        const decoded = verifyToken("invalid.token.value");
        expect(decoded).toBeNull();
    });
});
