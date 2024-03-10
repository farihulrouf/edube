const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authJwt");
const Model = require("../models/attendance");
const mongoose = require("mongoose");

// Endpoint to handle saving multiple attendance data
router.post("/save-attendance", async (req, res) => {
  const attendanceDataArray = req.body;

  try {
    // Create an array of new instances of the Attendance model
    const attendanceArray = attendanceDataArray.map(
      (attendanceData) => new Attendance(attendanceData)
    );

    // Save the array of attendance data to the database
    await Attendance.insertMany(attendanceArray);

    res.json({ success: true, message: "Attendance saved successfully." });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res
      .status(500)
      .json({ success: false, message: "Error saving attendance." });
  }
});

router.get("/all", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
