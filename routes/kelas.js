const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authJwt");
const Model = require("../models/kelas");
const mongoose = require("mongoose");
router.post("/post", async (req, res) => {
  const data = new Model({
    kode: req.body.kode,
    name: req.body.name,
   
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
