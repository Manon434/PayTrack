// import express from "express";
// import prisma from "../lib/prisma.js";

// const router = express.Router();

// router.get("/me", async (req, res) => {

//   if (!req.user) {
//     return res.status(401).json({
//       message: "Unauthorized"
//     });
//   }

//   res.json(req.user);

// });


// router.get("/", async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// router.get("/me", async (req, res) => {

//   res.json(req.user);

// });


// // Get single user by ID
// router.get("/:id", async (req, res) => {

//   try {

//     const user = await prisma.user.findUnique({
//       where: { id: req.params.id }
//     });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found"
//       });
//     }

//     res.json(user);

//   } catch (err) {

//     res.status(500).json({
//       message: err.message
//     });

//   }

// });


// export default router;

import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();


// ✅ Get current logged-in Prisma user
router.get("/me", async (req, res) => {

  try {

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    res.json(req.user);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// ✅ Get all users
router.get("/", async (req, res) => {

  try {

    const users =
      await prisma.user.findMany();

    res.json(users);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// ✅ Get user by ID
router.get("/:id", async (req, res) => {

  try {

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.params.id
        }
      });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});

export default router;
