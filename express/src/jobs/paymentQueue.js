import { Queue } from "bullmq";
import redis from "../providers/redisClient";

const paymentQueue = new Queue("paymentQueue", {
    connection: redis.duplicate(),
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
    },
});

export default paymentQueue;
