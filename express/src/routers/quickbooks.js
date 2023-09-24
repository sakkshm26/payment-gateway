import { Router } from "express";
import { syncPayments } from "../controllers/index.js";

const router = Router();

router.get("/callback", syncPayments);

export default router;
