const express = require("express");
const Model = require("../models/jadwal");
const router = express.Router();
const auth = require("../middlewares/authJwt");

router.post("/post", async (req, res) => {
  const data = new Model({
    kode: req.body.kode,
    hari: req.body.hari,
    id_guru: req.body.id_guru,
    id_matpel: req.body.id_matpel,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
