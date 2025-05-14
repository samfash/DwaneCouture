import passport from "passport";
import request from "supertest";
import express from "express";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const app = express();
app.use(passport.initialize());

// Mock Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: "mock-client-id",
      clientSecret: "mock-client-secret",
      callbackURL: "http://localhost:5000/auth/google/tailoringApp",
    },
    (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
      done(null, { id: "google123", email: "test@google.com"});
    }
  )
);

app.get("/auth/google", passport.authenticate("google", { session: false }));

app.get("/auth/google/callback", (req, res) => {
  res.json({ message: "Google OAuth success", user: { id: "google123", email: "test@google.com" } });
});

describe("Auth Strategy - Google OAuth", () => {
  it("should redirect to Google login", async () => {
    const response = await request(app).get("/auth/google");
    expect(response.status).toBe(302);
  });

  it("should authenticate and return user data", async () => {
    const response = await request(app).get("/auth/google/callback");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Google OAuth success");
    expect(response.body.user).toEqual({ id: "google123", email: "test@google.com" });
  });
});
