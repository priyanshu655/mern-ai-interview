import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const redisClient = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

redisClient.on("connect", () => {
    console.log("✅ Redis Connected");
});

redisClient.on("error", (err) => {
    console.error("Redis Error:", err);
});

if (process.env.NODE_ENV !== "test") {
    await redisClient.connect();
}

export const closeRedis = async () => {
    if (redisClient.isOpen) {
        await redisClient.quit();
    }
};

export default redisClient;