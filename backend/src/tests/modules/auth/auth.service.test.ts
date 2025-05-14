import { registerUser, loginUser, forgotPassword, resetPassword, registerOAuthUser } from "../../../modules/auth/auth.service";
import { findUserByEmail, createUser, updateUserResetToken, findUserByResetToken, updateUserPassword, createOAuthUser } from "../../../modules/auth/auth.model";
import * as tokenUtils from "../../../core/auth.utils";
import {sendEmail} from "../../../core/email.service";
import { Request } from "express";

jest.mock("../../../modules/auth/auth.model");
jest.mock("../../../core/auth.utils");

jest.mock("../../../core/auth.utils", () => ({
  generateToken: jest.fn(() => "mockedToken"),
}));

jest.mock("../../../core/email.service", () => ({
  sendEmail: jest.fn(),
}));

const generateToken = tokenUtils.generateToken as jest.Mock;

describe("Auth Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should register a user and return a token", async () => {
    const mockUser = { id: "1", email: "test@example.com", role: "user" };
    (findUserByEmail as jest.Mock).mockResolvedValue(null);
    (createUser as jest.Mock).mockResolvedValue(mockUser);
    (generateToken as jest.Mock).mockReturnValue("mockedToken");

    const testdata = {email:"test@example.com", password:"password"};
    const result = await registerUser(testdata);

    expect(findUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(createUser).toHaveBeenCalledWith("test@example.com", "hashed-password", "user");
    expect(generateToken).toHaveBeenCalledWith({ id: "1", email: "test@example.com", role: "user" });
    expect(result.user).toHaveProperty("id");
    expect(result).toEqual({ token: "mockedToken", user: mockUser, });
  });
  
  test("should throw an error if user already exists", async () => {
    const existingUser = { id: "1", email: "test@example.com" };
    (findUserByEmail as jest.Mock).mockResolvedValue(existingUser);

    const testdata = {email:"test@example.com", password:"any"};
    await expect(registerUser(testdata)).rejects.toThrow("User already exists");
    expect(createUser).not.toHaveBeenCalled();
    expect(generateToken).not.toHaveBeenCalled();
  });

  test("should login a user and return a token", async () => {
    const mockUser = { id: "1", email: "test@example.com", password: "hashed-Secure@123", role: "user", isOAuth: false };
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    (generateToken as jest.Mock).mockReturnValue("mockedToken");

    const testdata = {email:"test@example.com", password:"Secure@123"};
    const result = await loginUser(testdata);
    expect(result).toHaveProperty("token");
    expect(result.token).toBe("mockedToken");
  });

  test("should not login an OAuth user with password", async () => {
    const mockUser = { id: "1", email: "test@example.com", password: 'hashed-randomNo' ,isoauth: true };
    (findUserByEmail as jest.Mock).mockResolvedValue(mockUser);
    const testdata = {email:"test@example.com", password:"password"};
    await expect(loginUser(testdata)).rejects.toThrow("Please log in using OAuth");
  });

  test("should generate and store reset token", async () => {
    (findUserByEmail as jest.Mock).mockResolvedValue({ id: "1", email: "test@example.com" });
    (updateUserResetToken as jest.Mock).mockResolvedValue(undefined);
    const mockReq = { protocol: "http", get: () => "localhost:5000" } as unknown as Request;

    const testdata = {email:"test@example.com"};
    const result = await forgotPassword(testdata, mockReq);
    const [email, subject, message] = (sendEmail as jest.Mock).mock.calls[0];
    
    expect(result).toEqual({ message: "Password reset link sent to your email" });
    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(email).toBe("test@example.com");
    expect(subject).toBe("Password Reset Request");
    expect(message).toContain("http://localhost:5000/api/auth/reset-password/");
  });

  test("should reset password with a valid token", async () => {
    const mockUser = { email: "test@example.com",resettoken:"valid-token", resettokenexpiry: new Date(Date.now() + 3600000) };
    (findUserByResetToken as jest.Mock).mockResolvedValue(mockUser);
    (updateUserPassword as jest.Mock).mockResolvedValue(undefined);

    const testdata = {resetToken:"valid-token", newPassword:"password"};
    await expect(resetPassword(testdata)).resolves.toEqual({ message: "Password has been reset successfully" });
  });

  test("should register or login an OAuth user and return a token", async () => {
    const mockUser = { id: "1", email: "oauth@example.com", isOAuth: true };
    (findUserByEmail as jest.Mock).mockResolvedValue(null);
    (createOAuthUser as jest.Mock).mockResolvedValue(mockUser);
    (generateToken as jest.Mock).mockReturnValue("mockedToken");

    const testdata = {id: "123456dfvggg",email:"test@example.com"};
    const result = await registerOAuthUser(testdata);
    expect(result).toEqual({token: "mockedToken", user: mockUser});
  });
});
