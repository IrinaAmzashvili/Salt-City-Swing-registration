const express = require("express");
const asyncHandler = require("express-async-handler");
// const { check } = require("express-validator");
const {
  singlePublicFileUpload,
  singleMulterUpload,
  deleteSingleFile,
} = require("../../awsS3");
// const { handleValidationErrors } = require("../../utils/validation");
// const { Class, Category } = require("../../db/models");

const router = express.Router();

router.post(
  "/",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const imgUrl = await singlePublicFileUpload(req.file);
    return res.json({ imgUrl });
  })
);

router.delete(
  "/",
  asyncHandler(async (req, res) => {
    const url = req.body;
    await deleteSingleFile(url);
    res.json({ success: true });
  })
);

module.exports = router;
