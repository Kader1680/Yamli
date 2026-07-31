const express = require("express");
const router = express.Router();

const authController = require("../controller/authController");
const prisma = require("../config/prisma");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/me", authController.protect, (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
});

router.get("/all-users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        bio: true,
        coverPhoto: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
});

module.exports = router;