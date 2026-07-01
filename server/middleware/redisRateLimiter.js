import TokenBucket from "../services/tokenBucket.js";

const bucket = new TokenBucket(
    10, // Capacity
    1   // Refill 1 token per second
);

export const redisRateLimiter = async (req, res, next) => {
    try {
        // Use authenticated user id later
        const userId = req.user?.id || req.ip;

        const allowed = await bucket.consume(userId);

        if (!allowed) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later."
            });
        }
console.log("allowed rate limiter");
        next();

    } catch (error) {
        console.error("Rate Limiter Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};