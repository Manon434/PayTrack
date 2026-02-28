import prisma from "../lib/prisma.js";
import { InvoiceStatus, Role } from "@prisma/client";

export function submitInvoice(invoice, user) {
  if (invoice.status !== InvoiceStatus.DRAFT)
    throw new Error("Only draft invoices can be submitted");

  if (user.role !== Role.VENDOR)
    throw new Error("Only vendor can submit invoice");

  return { status: InvoiceStatus.SUBMITTED };
}

export function approveInvoice(invoice, user) {
  if (
    invoice.status === InvoiceStatus.SUBMITTED &&
    user.role === Role.DEPARTMENT
  ) {
    return {
      status: InvoiceStatus.DEPT_APPROVED,
      deptApprovedById: user.id,
    };
  }

  if (
    invoice.status === InvoiceStatus.DEPT_APPROVED &&
    user.role === Role.FINANCE
  ) {
    return {
      status: InvoiceStatus.FINANCE_APPROVED,
      financeApprovedById: user.id,
    };
  }

  if (
    invoice.status === InvoiceStatus.FINANCE_APPROVED &&
    user.role === Role.ACCOUNTS
  ) {
    return { status: InvoiceStatus.PAID };
  }

  throw new Error("Invalid approval action");
}

export function rejectInvoice(invoice, user, reason) {
  if (![Role.DEPARTMENT, Role.FINANCE].includes(user.role)) {
    throw new Error("Not allowed to reject");
  }

  return {
    status: InvoiceStatus.REJECTED,
    rejectionReason: reason,
  };
}
