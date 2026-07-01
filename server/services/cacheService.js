import redisClient from "../config/redis.js";

export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);

    if (!data) return null;

    return JSON.parse(data);
  } catch (err) {
    console.error("Cache Get Error:", err);
    return null;
  }
};

export const setCache = async (key, value, ttl = 300) => {
  try {
    await redisClient.setEx(
      key,
      ttl,
      JSON.stringify(value)
    );
  } catch (err) {
    console.error("Cache Set Error:", err);
  }
};

export const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (err) {
    console.error("Cache Delete Error:", err);
  }
};