import prisma from "../lib/prisma.js";

export async function logActivity(
  invoiceId,
  userId,
  action,
  metadata =null

) {

  await prisma.invoiceActivity.create({

    data: {
      invoiceId,
      userId,
      action,
      metadata,
    }

  });

}