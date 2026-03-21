// import "dotenv/config";
// import { defineConfig } from "prisma/config";

// export default defineConfig({
//   datasource: {
//     provider: "postgresql",
//     url: process.env.DATABASE_URL,
//   },

//   migrations: {
//     seed: "node prisma/seed.js",
//   },
// });

// import "dotenv/config";
// import { defineConfig } from "prisma/config";

// export default defineConfig({
//   schema: "prisma/schema.prisma",
// });

import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
});