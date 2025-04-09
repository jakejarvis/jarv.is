import { Redis } from "@upstash/redis";

// pulls credentials (prefixed with 'KV_REST_API_') set automatically by Vercel marketplace integration:
// https://github.com/upstash/redis-js/blob/091e0a0949593d74b905f41f7cb409ada16f936f/platforms/nodejs.ts#L184
const redis = Redis.fromEnv();

export default redis;
