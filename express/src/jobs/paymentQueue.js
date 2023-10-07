import { Queue } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

const paymentQueue = new Queue("paymentQueue", {
    connection: process.env.REDIS_URL,
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: "exponential",
            delay: 1000,
        },
    },
});

export default paymentQueue;
