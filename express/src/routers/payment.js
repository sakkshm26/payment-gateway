import { Router } from "express";
import {
    createPayment,
    getSentPayments,
    getReceivedPayments,
    getPayment,
} from "../controllers/index.js";

const router = Router();

router.post("/", createPayment);
router.get("/sent", getSentPayments);
router.get("/received", getReceivedPayments);
router.get("/:id", getPayment);

export default router;
