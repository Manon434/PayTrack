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

import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.post("/sync-user", async (req, res) => {

  const { email, supabaseId } = req.body;

  try {

    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {

      let role = "ACCOUNTS";

      const ADMIN_EMAILS = [
        "admin1@gmail.com"
      ];

      if (ADMIN_EMAILS.includes(email)) {
        role = "ADMIN";
      }
      else if (email.includes("vendor")) {
        role = "VENDOR";
      }
      else if (email.includes("dept")) {
        role = "DEPARTMENT";
      }
      else if (email.includes("finance")) {
        role = "FINANCE";
      }

      const count = await prisma.user.count();

      if (count === 0) {
        role = "ADMIN";
      }

      user = await prisma.user.create({
        data: {
          email,
          role,
          supabaseId
        }
      });

    }
    else {

      // ⭐ CRITICAL FIX: update supabaseId if missing
      if (!user.supabaseId) {

        user = await prisma.user.update({
          where: { email },
          data: { supabaseId }
        });

      }

    }

    res.json(user);

  }
  catch (err) {
    res.status(500).json({
      message: err.message
    });
  }

});

export default router;
