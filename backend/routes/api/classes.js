const express = require("express");
const asyncHandler = require("express-async-handler");
const { Class } = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const classes = await Class.findAll();
    res.json(classes);
  })
);

// router.get(
//   "/:classId",
//   asyncHandler(async (req, res) => {
//     const classId = req.params.classId;
//     // console.log("----------------->BACKEND<----------------", classId);
//     const classObj = await Class.findByPk(classId);
//     console.log(classObj);
//     res.json(classObj);
//   })
// );

module.exports = router;
