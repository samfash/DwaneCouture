import request from "supertest";
import app from "../../app";
import pool from "../../core/database";
import { v4 as uuidv4 } from "uuid";
describe("Auth Integration Tests", () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        await pool.query("DELETE FROM users;");
    });
    //   jest.mock("passport", () => {
    //     return {
    //       __esModule: true, // ✅ Ensure ES module compatibility
    //       default: jest.requireActual("passport"), // ✅ Preserve real passport module
    //       authenticate: jest.fn(() => (req: Request, res: Response, next: NextFunction) => {
    //         req.user = { email: "oauthuser@example.com", id: "mock-id", role: "user" }; // ✅ Mock OAuth user
    //         next();
    //       }),
    //     };
    //   });
    // jest.mock("passport", () => ({
    //     authenticate: jest.fn((strategy, options, callback) => {
    //     return (req:Request , res: Response, next: NextFunction) => {
    //         req.user = {
    //         email: "test@example.com",
    //         id: "mocked-id",
    //         role: "user", // Added role to match the User interface
    //         };
    //         callback(null, req.user);
    //     };
    //     }),
    // }));
    let validToken;
    let userId = uuidv4();
    it("should register a new user and return a JWT token", async () => {
        const response = await request(app)
            .post("/auth/signup")
            .send({ email: "test@example.com", password: "Secure@123" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("token");
        expect(response.body.user.email).toBe("test@example.com");
        expect(response.body.user.role).toBe("user"); // ✅ Default role is user
        validToken = response.body.token;
        console.log("🔑 Valid Token:", validToken); // ✅ Debugging
    });
    it("should not allow duplicate email registration", async () => {
        await request(app).post("/auth/signup").send({ email: "test4@example.com", password: "Secure@123" });
        const response = await request(app).post("/auth/signup").send({ email: "test4@example.com", password: "Secure@123" });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("User already exists");
    }, 10000);
    it("should reject invalid signup requests", async () => {
        const response = await request(app).post("/auth/signup").send({ email: "invalid-email", password: "short" });
        expect(response.status).toBe(400);
        expect(response.body.error).toContain("Invalid email format");
    });
    it("should reject access to protected routes without a valid token", async () => {
        const response = await request(app).get("/protected");
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized: Missing or invalid token");
    });
    it("should allow access to protected routes with a valid token", async () => {
        const signupResponse = await request(app)
            .post("/auth/signup")
            .send({ email: "test1@example.com", password: "Secure@123" });
        const token = signupResponse.body.token;
        const response = await request(app)
            .get("/protected")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("message", "Access granted");
    });
    it("should log in an existing user and return a JWT token", async () => {
        await request(app).post("/auth/signup").send({ email: "test31@example.com", password: "Secure@123" });
        const response = await request(app)
            .post("/auth/login")
            .send({ email: "test31@example.com", password: "Secure@123" });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });
    it("should reject login with invalid credentials", async () => {
        const response = await request(app)
            .post("/auth/login")
            .send({ email: "test@example.com", password: "WrongPassword" });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Invalid credentials, user not found");
    });
    it("should reject access to protected routes without a valid token", async () => {
        const response = await request(app).get("/protected");
        expect(response.status).toBe(401);
        expect(response.body.error).toBe("Unauthorized: Missing or invalid token");
    });
    it("should send a password reset email", async () => {
        await request(app).post("/auth/signup").send({ email: "test@example.com", password: "Secure@123" });
        const response = await request(app)
            .post("/auth/forgot-password")
            .send({ email: "test@example.com" });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Password reset link sent to your email");
    }, 10000);
    it("should reset the user password using a valid reset token", async () => {
        await request(app).post("/auth/signup").send({ email: "test12@example.com", password: "Secure@123" });
        const forgotResponse = await request(app)
            .post("/auth/forgot-password")
            .send({ email: "test12@example.com" });
        // ✅ Retrieve the actual reset token from the database
        const result = await pool.query("SELECT resetToken FROM users WHERE email = $1", ["test12@example.com"]);
        const resetToken = result.rows[0].resettoken;
        console.log("resetToken: ", resetToken);
        expect(resetToken).toBeDefined();
        const resetResponse = await request(app)
            .post("/auth/reset-password")
            .send({ resetToken, newPassword: "NewSecure@123" });
        console.log("resetResponce: ", resetResponse.body);
        expect(resetResponse.status).toBe(200);
        expect(resetResponse.body.message).toBe("Password has been reset successfully");
    }, 10000);
    it("should not allow OAuth users to log in with a password", async () => {
        await pool.query("INSERT INTO users (email, password, role, isOAuth) VALUES ($1, $2, $3, $4)", ["oauthuser@example.com", "Secure@123", "user", true]);
        const response = await request(app)
            .post("/auth/login")
            .send({ email: "oauthuser@example.com", password: "random" });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("Please log in using OAuth");
    });
    it("should delete a user", async () => {
        const res = await request(app)
            .delete(`/auth/users/${userId}`)
            .set("Authorization", `Bearer ${validToken}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("User deleted successfully");
    });
});
