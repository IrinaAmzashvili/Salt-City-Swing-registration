const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const classes = await db.Class.findAll();
    res.json(classes);
  })
);

module.exports = router;
