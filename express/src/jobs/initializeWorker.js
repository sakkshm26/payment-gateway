import { Worker } from "bullmq";
import Payment from "../models/payment.js";
import redis from "../providers/redisClient.js";

const worker = new Worker("paymentQueue", async (job) => {
    const { amount, type, data, sender_id, receiver_id } = job.data;

    await Payment.create({
        amount,
        type,
        data,
        sender_id,
        receiver_id,
    });
}, {
    connection: redis.duplicate()
});

export const initializePaymentWorker = () => {
    worker.on("completed", (job) => {
        console.log(
            `Job with name ${job.name} and id ${job.id} executed success`
        );
    });
};
