import express from "express";
import {
  monthlyInvoices,
  vendorSpending,
  approvalTime,
  paymentDelay
} from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/monthly", monthlyInvoices);
router.get("/vendors", vendorSpending);
router.get("/approval-time", approvalTime);
router.get("/payment-delay", paymentDelay);

export default router;