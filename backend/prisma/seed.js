import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // USERS
  await prisma.user.createMany({
    data: [
      { id: "u1", email: "vendor@paytrack.com", role: "VENDOR" },
      { id: "u2", email: "dept@paytrack.com", role: "DEPARTMENT" },
      { id: "u3", email: "finance@paytrack.com", role: "FINANCE" },
      { id: "u4", email: "accounts@paytrack.com", role: "ACCOUNTS" },
      { id: "u5", email: "admin@paytrack.com", role: "ADMIN" },
    ],
    skipDuplicates: true,
  });

  // VENDORS
  await prisma.vendor.createMany({
    data: [
      { id: "v1", name: "Acme Corporation" },
      { id: "v2", name: "TechSupply India" },
      { id: "v3", name: "Prime Logistics" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
