-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentNotes" TEXT,
ADD COLUMN     "paymentReference" TEXT;
