const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  kode: {
    required: true,
    type: String,
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

module.exports = mongoose.model("Kelas", dataSchema);
