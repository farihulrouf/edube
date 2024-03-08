const express = require("express");
const Model = require("../models/jadwal");
const router = express.Router();
const auth = require("../middlewares/authJwt");
//const Model = require("../models/Model");
const Matpel = require("../models/matpel");
const mongoose = require("mongoose");

router.post("/post", async (req, res) => {
  const data = new Model({
    kode: req.body.kode,
    hari: req.body.hari,
    id_guru: req.body.id_guru,
    id_matpel: req.body.id_matpel,
    kelas: req.body.kelas,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/post", async (req, res) => {
  try {
    const { kode, hari, id_guru, id_matpel, kelas } = req.body;

    if (!id_guru || !id_matpel || !kelas) {
      return res.status(408).json({
        success: false,
        messages: "Please Fill all fields",
      });
    }
    {
      /*
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(400).json({
        success: false,
        message: "Customer not found",
      });
    }
  */
    }

    let newModel = await Model.create({
      kode: kode,
      id_guru: id_guru,
      id_matpel: id_matpel,
      kelas: kelas,
      hari: hari,
    });
    //customer.transactions.push(newTransaction);

    //customer.save();

    return res.status(200).json({
      success: true,
      message: "Jawal Added Successfully",
      data: newModel,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      messages: err.message,
    });
  }
});

router.get("/getjdwal", async (req, res) => {
  try {
    const { id_techer } = req.query;

    const result = await Model.aggregate([
      {
        $match: {
          id_guru: mongoose.Types.ObjectId(id_techer),
        },
      },
      {
        $lookup: {
          from: "matpels",
          localField: "id_matpel",
          foreignField: "_id",
          as: "matpels",
        },
      },
    ]);
    return res
      .status(200)
      .send({ success: true, msg: "jadwal", jadwal: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

module.exports = router;
