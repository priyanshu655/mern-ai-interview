import redisClient from "../config/redis.js";

class TokenBucket {
    constructor(capacity, refillRate) {
        // Maximum number of tokens
        this.capacity = capacity;

        // Tokens added per second
        this.refillRate = refillRate;
    }

    async consume(userId) {
        const key = `bucket:${userId}`;
        console.log(key);

        const now = Date.now();

        // Read bucket from Redis
        let bucket = await redisClient.get(key);
        console.log(bucket);

        // First request from this user
        if (!bucket) {
            bucket = {
                tokens: this.capacity,
                lastRefill: now
            };
        } else {
            bucket = JSON.parse(bucket);
        }

        // Time passed (seconds)
        const elapsedTime = (now - bucket.lastRefill) / 1000;

        // Tokens to refill
        const refillTokens = elapsedTime * this.refillRate;

        // Update token count (don't exceed capacity)
        bucket.tokens = Math.min(
            this.capacity,
            bucket.tokens + refillTokens
        );

        // Update refill timestamp
        bucket.lastRefill = now;

        // No tokens left
        if (bucket.tokens < 1) {
            await redisClient.setEx(
                key,
                3600,
                JSON.stringify(bucket)
            );

            return false;
        }

        // Consume one token
        bucket.tokens -= 1;

        // Save updated bucket
        await redisClient.setEx(
            key,
            3600,
            JSON.stringify(bucket)
        );

        return true;
    }
}

export default TokenBucket;