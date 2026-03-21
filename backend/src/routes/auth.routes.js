// import express from "express";
// import prisma from "../lib/prisma.js";

// const router = express.Router();

// router.post("/sync-user", async (req, res) => {

//   const { email, supabaseId } = req.body;

//   try {

//     let user = await prisma.user.findUnique({
//       where: { email }
//     });

//     if (!user) {

// let role = "ACCOUNTS";

// // ✅ ADMIN emails list
// const ADMIN_EMAILS = [
//   "admin1@gmail.com",
// ];

// // Check admin first
// if (ADMIN_EMAILS.includes(email)) {
//   role = "ADMIN";
// }
// else if (email.includes("vendor")) {
//   role = "VENDOR";
// }
// else if (email.includes("dept")) {
//   role = "DEPARTMENT";
// }
// else if (email.includes("finance")) {
//   role = "FINANCE";
// }

// const count = await prisma.user.count();

//       if (count === 0) {
//        role = "ADMIN";
//        }


//       user = await prisma.user.create({
//         data: {
//           email,
//           role,
//           supabaseId
//         }
//       });

//     }

//     res.json(user);

//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }

// });

// export default router;


// import express from "express";
// import prisma from "../lib/prisma.js";

// const router = express.Router();

// router.post("/sync-user", async (req, res) => {

//   const { email, supabaseId } = req.body;

//   try {

//     let user = await prisma.user.findUnique({
//       where: { email }
//     });

//     if (!user) {

//       let role = "ACCOUNTS";

//       const ADMIN_EMAILS = [
//         "admin1@gmail.com"
//       ];

//       if (ADMIN_EMAILS.includes(email)) {
//         role = "ADMIN";
//       }
//       else if (email.includes("vendor")) {
//         role = "VENDOR";
//       }
//       else if (email.includes("dept")) {
//         role = "DEPARTMENT";
//       }
//       else if (email.includes("finance")) {
//         role = "FINANCE";
//       }

//       const count = await prisma.user.count();

//       if (count === 0) {
//         role = "ADMIN";
//       }

//       user = await prisma.user.create({
//         data: {
//           email,
//           role,
//           supabaseId
//         }
//       });

//     }
//     else {

//       // ⭐ CRITICAL FIX: update supabaseId if missing
//       if (!user.supabaseId) {

//         user = await prisma.user.update({
//           where: { email },
//           data: { supabaseId }
//         });

//       }

//     }

//     res.json(user);

//   }
//   catch (err) {
//     res.status(500).json({
//       message: err.message
//     });
//   }

// });

// export default router;


// import express from "express";
// import prisma from "../lib/prisma.js";
// import { createClient } from "@supabase/supabase-js";

// const router = express.Router();

// // 🔥 create supabase client (server side)
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// router.post("/sync-user", async (req, res) => {
//   try {
//     // ✅ 1. GET TOKEN FROM HEADER
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }
//      console.log("TOKEN:", token);

//     const token = authHeader.split(" ")[1];
//     console.log("HEADERS:", req.headers);

//     // ✅ 2. VERIFY USER FROM SUPABASE
//     const { data, error } = await supabase.auth.getUser(token);
   

//     if (error || !data?.user) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     const email = data.user.email;
//     const supabaseId = data.user.id;
//     console.log("SUPABASE USER:", data, error);

//     // ✅ 3. UPSERT USER (NO CRASH)
//     const user = await prisma.user.upsert({
//       where: {
//         email,
//       },
//       update: {
//         supabaseId,
//       },
//       create: {
//         email,
//         supabaseId,
//         role: getRole(email),
//       },
//     });

//     res.json(user);

//   } catch (err) {
//     console.error("SYNC USER ERROR:", err);
//     res.status(500).json({
//       message: err.message,
//     });
//   }
// });

// // ✅ ROLE HELPER
// function getRole(email) {
//   const ADMIN_EMAILS = ["admin1@gmail.com"];

//   if (ADMIN_EMAILS.includes(email)) return "ADMIN";
//   if (email.includes("vendor")) return "VENDOR";
//   if (email.includes("dept")) return "DEPARTMENT";
//   if (email.includes("finance")) return "FINANCE";

//   return "ACCOUNTS";
// }

// export default router;

import express from "express";
import prisma from "../lib/prisma.js";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();

// 🔥 Supabase admin client (server-side only)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// ✅ SYNC USER ROUTE
router.post("/sync-user", async (req, res) => {
  try {
    // ✅ 1. Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN:", token);

    // ✅ 2. Verify user with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      console.error("SUPABASE ERROR:", error);
      return res.status(401).json({ message: "Invalid token" });
    }

    const supabaseUser = data.user;

    // ✅ 3. Safety checks
    if (!supabaseUser.email) {
      return res.status(400).json({ message: "Email not found in token" });
    }

    const email = supabaseUser.email;
    const supabaseId = supabaseUser.id;

    console.log("USER VERIFIED:", email);

    // ✅ 4. Upsert user in DB
    const user = await prisma.user.upsert({
      where: { email }, // must be unique in schema
      update: {
        supabaseId,
      },
      create: {
        email,
        supabaseId,
        role: getRole(email),
      },
    });

    return res.json(user);

  } catch (err) {
    console.error("SYNC USER ERROR:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

// ✅ ROLE HELPER FUNCTION
function getRole(email) {
  const ADMIN_EMAILS = ["admin1@gmail.com"];

  if (ADMIN_EMAILS.includes(email)) return "ADMIN";
  if (email.includes("vendor")) return "VENDOR";
  if (email.includes("dept")) return "DEPARTMENT";
  if (email.includes("finance")) return "FINANCE";

  return "ACCOUNTS";
}

export default router;