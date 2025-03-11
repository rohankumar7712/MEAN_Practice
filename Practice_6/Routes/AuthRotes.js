const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.get("/protected", authMiddleware, authController.protectedRoute);

module.exports = router;
