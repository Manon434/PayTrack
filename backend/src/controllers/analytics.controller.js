import prisma from "../lib/prisma.js";

/* ===============================
   MONTHLY INVOICE VOLUME
================================= */

export async function monthlyInvoices(req, res) {

  try {

    const invoices = await prisma.invoice.findMany({
      select: {
        createdAt: true
      }
    });

    const monthly = {};

    invoices.forEach(inv => {

      const date = new Date(inv.createdAt);

      const key =
        `${date.getFullYear()}-${date.getMonth()+1}`;

      monthly[key] = (monthly[key] || 0) + 1;

    });

    res.json(monthly);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to load monthly invoices"
    });

  }

}


/* ===============================
   VENDOR SPENDING
================================= */

export async function vendorSpending(req, res) {

  try {

    const vendors = await prisma.invoice.groupBy({

      by: ["vendorId"],

      _sum: {
        amount: true
      }

    });

    const vendorIds = vendors.map(v => v.vendorId);

    const vendorData = await prisma.vendor.findMany({
      where: {
        id: { in: vendorIds }
      }
    });

    const result = vendors.map(v => {

      const vendor =
        vendorData.find(x => x.id === v.vendorId);

      return {

        vendor: vendor?.name || "Unknown",

        total: Number(v._sum.amount)

      };

    });

    res.json(result);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to load vendor spending"
    });

  }

}


/* ===============================
   APPROVAL TIME
================================= */

export async function approvalTime(req, res) {

  try {

    const invoices = await prisma.invoice.findMany({
      where: {
        status: "FINANCE_APPROVED"
      }
    });

    const times = invoices.map(inv => {

      const created =
        new Date(inv.createdAt);

      const approved =
        new Date(inv.updatedAt);

      return (approved - created) / (1000 * 60 * 60);

    });

    const avg =
      times.reduce((a,b)=>a+b,0) /
      (times.length || 1);

    res.json({
      averageHours: avg.toFixed(2)
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to calculate approval time"
    });

  }

}


/* ===============================
   PAYMENT DELAY
================================= */

export async function paymentDelay(req, res) {

  try {

    const invoices = await prisma.invoice.findMany({
      where: {
        status: "PAID"
      }
    });

    const delays = invoices.map(inv => {

      const approved =
        new Date(inv.updatedAt);

      const paid =
        new Date(inv.paidAt);

      return (paid - approved) / (1000 * 60 * 60);

    });

    const avg =
      delays.reduce((a,b)=>a+b,0) /
      (delays.length || 1);

    res.json({
      averagePaymentHours: avg.toFixed(2)
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Unable to calculate payment delay"
    });

  }

}