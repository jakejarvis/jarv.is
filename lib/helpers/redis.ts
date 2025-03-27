import { Redis } from "@upstash/redis";

// Initialize Redis
const redis = Redis.fromEnv();

export default redis;
