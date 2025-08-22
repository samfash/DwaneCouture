import { registerUser, loginUser, forgotPassword, resetPassword, registerOAuthUser, assignUserRole, refreshTokenService, deleteUserService, getAllUsersService } from "./auth.service";
import { registerValidation, loginValidation, forgotPasswordValidation, resetPasswordValidation, oauthValidation } from "./auth.validation";
import logger from "../../core/logger";
import { setTokenCookie } from "../../core/cookie.util";
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }
        const validatedData = registerValidation.parse(req.body);
        const { token, user } = await registerUser(validatedData);
        setTokenCookie(res, token); // ✅ Set cookie
        res.status(201).json({ message: "User registered successfully", token, user });
        return;
    }
    catch (error) {
        logger.error(`Registration Error: ${error.message}`);
        res.status(400).json({ error: error.message });
        return;
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required" });
            return;
        }
        const validatedData = loginValidation.parse(req.body);
        const { token } = await loginUser(validatedData);
        setTokenCookie(res, token); // ✅ Set cookie
        res.status(200).json({ message: "Login successful", token });
        return;
    }
    catch (error) {
        logger.error(`Login Error:  ${error.message}`);
        res.status(400).json({ error: error.message });
        return;
    }
};
export const refreshTokenController = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: "Refresh token missing" });
            return;
        }
        const { token: newToken } = await refreshTokenService(token); // ✅ Use service to refresh token
        setTokenCookie(res, newToken); // ✅ Refresh cookie
        res.status(200).json({
            message: "Token refreshed",
            token: newToken, // ✅ Backward compatible
        });
    }
    catch (error) {
        res.status(403).json({ error: "Token is invalid or expired" });
    }
};
export const logoutController = async (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });
    res.status(200).json({
        message: "Logged out successfully",
        token: null, // ✅ backward compatible
    });
};
export const forgotPasswordController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: "Email is required" });
            return;
        }
        const validatedData = forgotPasswordValidation.parse(req.body);
        const response = await forgotPassword(validatedData, req);
        res.status(200).json(response);
        return;
    }
    catch (error) {
        logger.error(`Forgot Password Error: ${error.message}`);
        res.status(400).json({ error: error.message });
        return;
    }
};
export const resetPasswordController = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        if (!resetToken || !newPassword) {
            res.status(400).json({ error: "Reset token and new password are required" });
            return;
        }
        const validatedData = resetPasswordValidation.parse(req.body);
        const response = await resetPassword(validatedData);
        res.status(200).json(response);
        return;
    }
    catch (error) {
        logger.error(`Reset Password Error: ${error.message}`);
        res.status(400).json({ error: error.message });
        return;
    }
};
export const googleOAuthCallback = async (req, res) => {
    if (!req.user) {
        res.status(401).json({ error: "Authentication failed" });
        return;
    }
    const validatedData = oauthValidation.parse(req.user);
    try {
        const { token, user } = await registerOAuthUser(validatedData);
        setTokenCookie(res, token); // ✅ Set cookie
        // http://localhost:3000?token=${token}&email=${user.email}
        res.redirect(`http://localhost:3000`);
        return;
    }
    catch (error) {
        logger.error(`OAuth Error: ${error.message}`);
        res.status(500).json({ error: "OAuth processing failed" });
        return;
    }
};
// PATCH /users/:id/role
export const assignRoleController = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    if (!["admin", "user", "tailor"].includes(role)) {
        res.status(400).json({ error: "Invalid role type" });
        return;
    }
    try {
        const user = await assignUserRole(id, role);
        res.status(200).json({ message: "Role updated", user });
        return;
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update role" });
        return;
    }
};
export const getAllUsersController = async (_req, res) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json(users);
    }
    catch (error) {
        logger.error("❌ GetAllUsersController Error:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
};
// ✅ DELETE /auth/users/:id
export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        await deleteUserService(id);
        res.status(200).json({ message: "User deleted successfully" });
        return;
    }
    catch (err) {
        logger.error("❌ Delete User Error:", err);
        res.status(500).json({ error: "Server error" });
        return;
    }
};
