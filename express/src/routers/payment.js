import { Router } from "express";
import { createPayment, getPayments, getPayment } from "../controllers/index.js";

const router = Router();

router.post("/", createPayment);
router.get("/", getPayments);
router.get("/:id", getPayment);

export default router;
