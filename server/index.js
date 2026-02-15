import 'dotenv/config';
import express from "express";
import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/userRouter.js";
import bookmarkRouter from "./src/routes/bookMarkrouter.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import "./src/config/passport.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: (process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, ""),
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());
const PORT = process.env.PORT || 4000;
connectDB();

app.use("/api/v1", userRouter)
app.use("/api/v1", bookmarkRouter)

app.listen(PORT, () => {
  console.log(`your server is running on the port http://localhost:${PORT}`);
});
