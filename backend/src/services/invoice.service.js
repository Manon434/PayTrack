// import prisma from "../config/prisma.js";
// import { InvoiceStatus } from "@prisma/client";

// export async function createInvoice(data, user) {
//   if (user.role !== "VENDOR") {
//     throw new Error("Only vendors can create invoices");
//   }

//   return prisma.invoice.create({
//     data: {
//       invoiceNumber: data.invoiceNumber,
//       amount: data.amount,
//       currency: "INR",
//       description: data.description,
//       fileUrl: data.fileUrl ?? null,

//       vendor: { connect: { id: data.vendorId } },
//       submittedBy: { connect: { id: user.id } },
//     },
//   });
// }

// export async function getInvoicesForUser(user) {
//   if (user.role === "ADMIN") {
//     return prisma.invoice.findMany({
//       include: { vendor: true },
//       orderBy: { createdAt: "desc" },
//     });
//   }

//   if (user.role === "VENDOR") {
//     return prisma.invoice.findMany({
//       where: { submittedById: user.id },
//       include: { vendor: true },
//     });
//   }

//   return prisma.invoice.findMany({
//     where: { status: InvoiceStatus.SUBMITTED },
//     include: { vendor: true },
//   });
// }

import prisma from "../lib/prisma.js";
import {
  submitInvoice,
  approveInvoice,
  rejectInvoice
} from "./invoiceApproval.service.js";

// CREATE
export async function createInvoice(data, user) {
  if (user.role !== "VENDOR") {
    throw new Error("Only vendors can create invoices");
  }

  return prisma.invoice.create({
    data: {
      invoiceNumber: data.invoiceNumber,
      amount: data.amount,
      currency: "INR",
      description: data.description,
      fileUrl: data.fileUrl ?? null,
      vendor: { connect: { id: data.vendorId } },
      submittedBy: { connect: { id: user.id } },
    },
  });
}

// LIST
export async function listInvoices(user) {
  if (user.role === "ADMIN") {
    return prisma.invoice.findMany({
      include: { vendor: true },
      orderBy: { createdAt: "desc" },
    });
  }

  if (user.role === "VENDOR") {
    return prisma.invoice.findMany({
      where: { submittedById: user.id },
      include: { vendor: true },
    });
  }

  return prisma.invoice.findMany({
    include: { vendor: true },
  });
}

// SUBMIT
export async function submitInvoiceById(id, user) {
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) throw new Error("Invoice not found");

  const updates = submitInvoice(invoice, user);

  return prisma.invoice.update({
    where: { id },
    data: updates,
  });
}

// APPROVE
export async function approveInvoiceById(id, user) {
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) throw new Error("Invoice not found");

  const updates = approveInvoice(invoice, user);

  return prisma.invoice.update({
    where: { id },
    data: updates,
  });
}

// REJECT
export async function rejectInvoiceById(id, user, reason) {
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) throw new Error("Invoice not found");

  const updates = rejectInvoice(invoice, user, reason);

  return prisma.invoice.update({
    where: { id },
    data: updates,
  });
}
