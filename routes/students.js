const express = require("express");
const Model = require("../models/student");
const router = express.Router();
const auth = require("../middlewares/authJwt");
const mongoose = require("mongoose");

const getPagination = (page, size) => {
  const limit = size ? +size : 5;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

router.get("/getall", async (req, res) => {
  const { page, size, name } = req.query;
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Model.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        students: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});

//Post Method
router.post("/post", async (req, res) => {
  const data = new Model({
    name: req.body.name,
    no_id: req.body.no_id,
    no_tel: req.body.no_tel,
    addres: req.body.addres,
    gender: req.body.gender,
    id_kelas: req.body.id_kelas,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/", async (req, res) => {
  let { no } = req.query;
  try {
    const data = await Model.findOne({ no_id: `${no}` });
    //const data = await Model.findOne(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/getnomer", async (req, res) => {
  const nomer = req.query.no;
  //var name = req.query.nama;

  // console.log('ini data', nomer)

  // customer: `${id}`
  try {
    var data = await Model.findOne({ no_id: `${nomer}` });
    return res
      .status(200)
      .send({ success: true, msg: "Customer Details", user: data });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

router.get("/search/", async (req, res) => {
  try {
    var s = req.body.s;
    var data = await Model.find({ name: { $regex: ".*" + s + ".*" } });

    if (data.length > 0) {
      res
        .status(200)
        .send({ success: true, msg: "Student Details", data: data });
    } else {
      res.status(200).send({ success: true, msg: "Student Not found!" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

//Update by ID Method
router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    updatedData.updated_at = new Date();
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/all", async (req, res) => {
  let { page, limit, s, k } = req.query;
  //    {$match: {"$and": [{season: 2}, {customer_id: '905250069463326740'}, {status: "Completed"}]}},

  try {
    var condition = s ? { name: { $regex: new RegExp(s), $options: "i" } } : {};
    const result = await Model.aggregate([
      {
        $match: { id_kelas: mongoose.Types.ObjectId(k) },
      },
      {
        $match: condition,
      },
      { $sort: { created_at: -1 } },
      {
        $facet: {
          metaData: [
            {
              $count: "totalDocuments",
            },
            {
              $addFields: {
                pageNumber: page,
                totalPages: {
                  $ceil: { $divide: ["$totalDocuments", parseInt(limit)] },
                },
              },
            },
          ],
          data: [
            {
              $skip: (page - 1) * parseInt(limit),
            },
            {
              $limit: parseInt(limit),
            },
          ],
        },
      },
    ]);
    return res
      .status(200)
      .send({ success: true, msg: "Sucess", student: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
});

module.exports = router;
