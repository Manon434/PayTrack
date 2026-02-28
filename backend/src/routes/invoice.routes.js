import express from "express";
import prisma from "../lib/prisma.js";
import {
  create,
  list,
  submit,
  approve,
  reject,
  markPaid,
  getActivity,
} from "../controllers/invoice.controller.js";



const router = express.Router();

/* CRUD */
router.post("/", create);
router.get("/", list);

/* WORKFLOW */
router.post("/:id/submit", submit);
router.post("/:id/approve", approve);
router.post("/:id/reject", reject);

router.get("/:id/activity", getActivity);

router.get("/my", async (req, res) => {

  try {

    const invoices =
      await prisma.invoice.findMany({

        where: {
          submittedById: req.user.id
        },

        include: {
          vendor: true
        },

        orderBy: {
          createdAt: "desc"
        }

      });

    res.json(invoices);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

router.get("/:id/activity", async (req, res) => {

  const activities =
    await prisma.invoiceActivity.findMany({

      where: { invoiceId: req.params.id },

      include: { user: true },

      orderBy: { createdAt: "asc" }

    });

  res.json(activities);

});



export default router;
