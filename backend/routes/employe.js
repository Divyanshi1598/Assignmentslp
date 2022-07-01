const express = require("express");
const {
  getEmployes,
  getEmploye,
  createEmploye,
  deleteEmploye,
  updateEmploye,
} = require("../controllers/employeController");

const router = express.Router();

// GET all workouts
router.get("/", getEmployes);

// GET a single workout
router.get("/:id", getEmploye);

// POST a new workout
router.post("/", createEmploye);

// DELETE a workout
router.delete("/:id", deleteEmploye);

// UPDATE a workout
router.patch("/:id", updateEmploye);

module.exports = router;
