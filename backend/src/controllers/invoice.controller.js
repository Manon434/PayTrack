
import prisma from "../lib/prisma.js";

import {
  submitInvoice,
  approveInvoice,
  rejectInvoice,
} from "../services/invoiceApproval.service.js";

import { logActivity } from "../utils/activityLogger.js";


/* ===============================
   CREATE
================================= */
export async function create(req, res) {

  try {

    if (req.user.role !== "VENDOR") {
      return res.status(403).json({
        message: "Only vendors can create invoices"
      });
    }

    const invoice = await prisma.invoice.create({

      data: {
        invoiceNumber: req.body.invoiceNumber,
        amount: req.body.amount,
        description: req.body.description,
        vendorId: req.body.vendorId,
        submittedById: req.user.id,
      },

    });

    await logActivity(
      invoice.id,
      req.user.id,
      "CREATED"
    );

    res.status(201).json(invoice);

  } catch (e) {

    // Duplicate invoice number
    if (e.code === "P2002" && e.meta?.target?.includes("invoiceNumber")) {
      return res.status(400).json({
        message: "Invoice number already exists"
      });
    }

    console.error("Create Invoice Error:", e);

    res.status(400).json({
      message: "Unable to create invoice"
    });

  }
}


/* ===============================
   LIST (Role Based)
================================= */


// export async function list(req, res) {

//   try {

//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;

//     const skip = (page - 1) * limit;

//     let where = {};

//     if (req.user.role === "VENDOR") {
//       where.submittedById = req.user.id;
//     }
//     else if (req.user.role === "DEPARTMENT") {
//       where.status = "SUBMITTED";
//     }
//     else if (req.user.role === "FINANCE") {
//       where.status = "DEPT_APPROVED";
//     }
//     else if (req.user.role === "ACCOUNTS") {
//       where.status = "FINANCE_APPROVED";
//     }
//     else if (req.user.role === "ADMIN") {
//       where = {};
//     }

//     const [invoices, total] = await Promise.all([

//       prisma.invoice.findMany({
//         where,
//         include: { vendor: true },
//         orderBy: { createdAt: "desc" },
//         skip,
//         take: limit
//       }),

//       prisma.invoice.count({ where })

//     ]);

//     res.json({
//       data: invoices,
//       total,
//       page,
//       totalPages: Math.ceil(total / limit)
//     });

//   } catch (e) {

//     console.error("List Invoice Error:", e);

//     res.status(500).json({
//       message: "Unable to load invoices"
//     });

//   }

// }

/* ===============================
   LIST (Role Based + Pagination)
================================= */
export async function list(req, res) {

  try {

    // ✅ Pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    let where = {};

    // ===============================
    // ROLE FILTERING
    // ===============================

    if (req.user.role === "VENDOR") {
      where.submittedById = req.user.id;
    }

    else if (req.user.role === "DEPARTMENT") {
      where.status = "SUBMITTED";
    }

    else if (req.user.role === "FINANCE") {
      where.status = "DEPT_APPROVED";
    }

    else if (req.user.role === "ACCOUNTS") {
      where.status = "FINANCE_APPROVED";
    }

    else if (req.user.role === "ADMIN") {
      where = {};
    }

    // ===============================
    // PARALLEL QUERY (PERFORMANCE)
    // ===============================

    const [invoices, total] = await Promise.all([

      prisma.invoice.findMany({
        where,
        include: {
          vendor: true
        },
        orderBy: {
          createdAt: "desc"
        },
        skip,
        take: limit
      }),

      prisma.invoice.count({ where })

    ]);

    // ===============================
    // RESPONSE FORMAT
    // ===============================

    res.json({
      data: invoices,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {

    console.error("Invoice List Error:", error);

    res.status(500).json({
      message: "Unable to load invoices"
    });

  }

}

/* ===============================
   SUBMIT
================================= */
export async function submit(req, res) {

  try {

    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
    });

    if (!invoice)
      return res.status(404).json({
        message: "Invoice not found"
      });

    const update = submitInvoice(invoice, req.user);

    const updated = await prisma.invoice.update({

      where: { id: invoice.id },

      data: update,

    });

    await logActivity(
      invoice.id,
      req.user.id,
      "SUBMITTED"
    );

    res.json(updated);

  } catch (e) {

    console.error("Submit Error:", e);

    res.status(400).json({
      message: "Unable to submit invoice"
    });

  }

}


/* ===============================
   APPROVE
================================= */
export async function approve(req, res) {

  try {

    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id },
    });

    if (!invoice)
      return res.status(404).json({
        message: "Invoice not found"
      });

    const update = approveInvoice(invoice, req.user);

    const updated = await prisma.invoice.update({

      where: { id: invoice.id },

      data: update,

    });

    const action =
      req.user.role === "DEPARTMENT"
        ? "DEPT_APPROVED"
        : "FINANCE_APPROVED";

    await logActivity(
      invoice.id,
      req.user.id,
      action
    );

    res.json(updated);

  } catch (e) {

    console.error("Approve Error:", e);

    res.status(400).json({
      message: "Unable to approve invoice"
    });

  }

}


/* ===============================
   REJECT
================================= */
export async function reject(req, res) {

  try {

    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id }
    });

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found"
      });
    }

    const reason = req.body.reason;

    if (!reason) {
      return res.status(400).json({
        message: "Rejection reason is required"
      });
    }

    // ✅ Use service logic (very important)
    const update = rejectInvoice(invoice, req.user, reason);

    // ✅ Update invoice with rejectionReason
    const updated = await prisma.invoice.update({
      where: { id: invoice.id },
      data: update
    });

    // ✅ Store audit log WITH metadata
    await logActivity(
      invoice.id,
      req.user.id,
      "REJECTED",
      reason
    );

    res.json(updated);

  } catch (err) {

    console.error("Reject Error:", err);

    res.status(400).json({
      message: err.message || "Unable to reject invoice"
    });

  }

}
/* ===============================
   MARK PAID
================================= */
export async function markPaid(req, res) {

  try {

    if (
      req.user.role !== "FINANCE" &&
      req.user.role !== "ACCOUNTS"
    ) {

      return res.status(403).json({
        message: "Only finance/accounts can mark paid"
      });

    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: req.params.id }
    });

    if (!invoice)
      return res.status(404).json({
        message: "Invoice not found"
      });

    if (invoice.status !== "FINANCE_APPROVED")
      return res.status(400).json({
        message: "Invoice not ready for payment"
      });

    const updated = await prisma.invoice.update({

      where: { id: invoice.id },

      data: {
        status: "PAID",
        paidAt: new Date(),
        paymentReference: req.body.paymentReference,
        paymentNotes: req.body.paymentNotes || null
      }

    });

    await logActivity(
      invoice.id,
      req.user.id,
      "PAID"
    );

    res.json(updated);

  } catch (err) {

    console.error("Mark Paid Error:", err);

    res.status(400).json({
      message: "Unable to mark invoice as paid"
    });

  }

}

/* ===============================
   GET ACTIVITY (Audit Timeline)
================================= */
export async function getActivity(req, res) {

  try {

    const activities = await prisma.invoiceActivity.findMany({

      where: {
        invoiceId: req.params.id
      },

      include: {
        user: true
      },

      orderBy: {
        createdAt: "asc"
      }

    });

    res.json(activities);

  } catch (err) {

    console.error("Get Activity Error:", err);

    res.status(500).json({
      message: "Unable to load activity"
    });

  }

}