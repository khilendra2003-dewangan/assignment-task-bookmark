import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${(process.env.BACKEND_URL || "http://localhost:3000").replace(/\/$/, "")}/api/v1/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Auth Profile:", profile.id, profile.emails[0].value);
        const email = profile.emails[0].value;

        // 🔥 First check by email
        let user = await User.findOne({ email });

        if (user) {
          // If user exists but no googleId, link it
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }

          return done(null, user);
        }

        // If no user exists → create new
        user = await User.create({
          name: profile.displayName,
          email,
          googleId: profile.id,
        });

        done(null, user);
      } catch (error) {
        console.error("Google Auth Error:", error);
        done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
