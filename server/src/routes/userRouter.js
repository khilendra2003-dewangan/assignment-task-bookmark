import express from 'express'
import { GetUser, googleCallbackController, Login, Logout, Register } from '../controllers/userController.js';
import passport from 'passport';
import { protect } from '../middlewares/auth.js';


const userRouter=express.Router();



userRouter.post("/register",Register)
userRouter.post("/login",Login);
userRouter.post("/logout",Logout);
userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallbackController,
);
userRouter.get("/me", protect, GetUser);

export default userRouter;