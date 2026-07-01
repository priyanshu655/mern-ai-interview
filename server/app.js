import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

import { redisRateLimiter } from "./middleware/redisRateLimiter.js";

const app = express();

app.use(cors({
  origin: "https://ascendraai.onrender.com",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== "test") {
    app.use(redisRateLimiter);
}

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);

app.use("/app", redisRateLimiter, (req, res) => {
    return res.json({ message: "ok" });
});

export default app;
