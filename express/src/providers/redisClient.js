import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisConfig = {
    host: process.env.REDIS_URL,
    port: 6379,
};

const clientConnection = new Redis({
    ...redisConfig,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
});

clientConnection.on("connect", () => {
    console.log(`Redis connected`);
});

clientConnection.on("error", (err) => {
    console.log(`Error in redis connection - ${err}`);
});

clientConnection.on("end", () => {
    console.log("Redis connection ended");
});

export default clientConnection;
