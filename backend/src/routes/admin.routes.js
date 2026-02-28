import express from "express";
import prisma from "../lib/prisma.js";

const router = express.Router();


// GET all users
router.get("/users", async (req, res) => {

  try {

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "asc"
      }
    });

    res.json(users);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


// UPDATE user role
router.put("/users/:id/role", async (req, res) => {

  try {

    const { role } = req.body;

    const updated = await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: {
        role
      }
    });

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }

});


export default router;
