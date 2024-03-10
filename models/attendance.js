const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  id_student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },

  attendanceType: {
    type: String,
    enum: ["entry", "permission", "sick"],
  },

  hari: {
    required: true,
    type: String,
  },

  id_matpel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matpel",
  },

  kelas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kelas",
  },

  id_guru: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  tanggal: {
    type: Date,
    default: Date.now,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
    setOnInsert: false,
  },
});

module.exports = mongoose.model("Attendance", dataSchema);
