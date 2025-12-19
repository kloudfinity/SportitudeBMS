const express = require("express");
const router = express.Router();
const turfController = require("../controllers/turfController");
const { authenticate } = require("../middlewares/auth");
const { requireAdmin } = require("../middlewares/role");

// Public routes
router.get("/", turfController.getAllTurfs);
router.get("/:id", turfController.getTurfById);

// Admin routes
router.post("/", authenticate, requireAdmin, turfController.createTurf);
router.put("/:id", authenticate, requireAdmin, turfController.updateTurf);
router.delete("/:id", authenticate, requireAdmin, turfController.deleteTurf);

module.exports = router;
