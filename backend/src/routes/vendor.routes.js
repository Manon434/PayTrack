import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {

  const vendors = await prisma.vendor.findMany({
    where: { isActive: true }
  });

  res.json(vendors);

});

export default router;
