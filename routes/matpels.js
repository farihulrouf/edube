const express = require("express");
const Model = require("../models/matpel");
const router = express.Router();
const auth = require("../middlewares/authJwt");
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    kode: req.body.kode
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    updatedData.updated_at = new Date();
    const result = await Model.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/getall", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  let { id } = req.query;
  try {
    const data = await Model.findOne({ _id: id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
