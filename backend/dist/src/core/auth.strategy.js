import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import logger from "./logger";
import config from "./config";
dotenv.config();
passport.use(new GoogleStrategy({
    clientID: config.auth.google_id,
    clientSecret: config.auth.google_secret,
    callbackURL: config.auth.google_callback,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        if (!profile || !profile.id)
            throw new Error("Invalid Google profile data");
        const user = { id: profile.id, email: profile.emails?.[0].value };
        logger.info(`Google OAuth success for user: ${user.email}`);
        return done(null, user);
    }
    catch (error) {
        logger.error(`Google OAuth Error: ${error.message}`);
        return done(error, false);
    }
}));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});
export default passport;
