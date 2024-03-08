const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  kode: {
    required: true,
    type: String,
  },

  hari: {
    type: String,
    enum: ["Senin", "Selasa", "Rabu", "Kamis", "Juma", "Sabtu", "Minggu"],
  },
  kelas: {
    required: true,
    type: String,
  },
  awal_jam: {
    type: Date,
    default: Date.now,
    setOnInsert: false,
  },

  akhir_jam: {
    type: Date,
    default: Date.now,
    setOnInsert: false,
  },

  id_guru: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },

  id_matpel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Matpel",
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

module.exports = mongoose.model("Jadwal", dataSchema);
