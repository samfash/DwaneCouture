export const setTokenCookie = (res, token) => {
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Only over HTTPS in prod
        sameSite: "lax", // Helps mitigate CSRF
        maxAge: 60 * 60 * 1000, // 15 minutes
    });
};
