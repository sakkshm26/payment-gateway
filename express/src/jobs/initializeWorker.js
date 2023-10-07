import { Worker } from "bullmq";

const worker = new Worker("paymentQueue", async (job) => {
    console.log(`Job id ${job.id} at ${new Date()}`);
    console.log(`Parent key ${job.parentKey} at ${new Date()}`);
    console.log(`Repeat job key ${job.parentKey} at ${new Date()}`);
    return "Success";
});

export const initializePaymentWorker = () => {
    worker.on("completed", (job) => {
        console.log(
            `Job with name ${job.name} and id ${job.id} executed success`
        );
    });
};
