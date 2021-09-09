const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3');
const { handleValidationErrors } = require("../../utils/validation");
const { Class, Category } = require("../../db/models");

const router = express.Router();

const validateClass = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Title required")
    .isLength({ min: 4, max: 255 })
    .withMessage("Title must be between 4 and 255 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description required"),
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start date required"),
    // .isISO8601()
    // .toDate()
    // .withMessage("Start date must be a date"),
  check("cost")
    .exists({ checkFalsy: true })
    .withMessage("Cost required")
    .isNumeric()
    .withMessage("Cost must be a number")
    .isLength({ min: 0 })
    .withMessage("Cost cannot be a negative number"),
  check("categoryId")
    .exists({ checkFalsy: true })
    .withMessage("Level required")
    .isNumeric()
    .withMessage("CategoryId must be a number"),
  // check("image").exists({ checkFalsy: true }).withMessage("Image required"),
  handleValidationErrors,
];

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const classes = await Class.findAll({
      order: [["startDate"]],
      include: Category,
    });
    res.json(classes);
  })
);

router.post(
  "/",
  singleMulterUpload('image'),
  validateClass,
  asyncHandler(async (req, res) => {
    const classInfo = req.body;
    const classImageUrl = await singlePublicFileUpload(req.file);
    classInfo.image = classImageUrl;
    const newClass = await Class.create(classInfo);
    return res.json({ newClass });
  })
);

router.put(
  "/:id",
  singleMulterUpload('image'),
  validateClass,
  asyncHandler(async (req, res) => {
    const classInfo = req.body;
    const classId = +req.params.id;
    const targetClass = await Class.findByPk(classId);
    if (classInfo.image !== targetClass.image) {
      const classImageUrl = await singlePublicFileUpload(req.file);
      classInfo.image = classImageUrl;
    }
    const updatedClass = await targetClass.update(classInfo);
    return res.json({ updatedClass });
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const classId = +req.params.id;
    const targetClass = await Class.findByPk(classId);
    await targetClass.destroy()
    res.json({ success: true });
  })
)

module.exports = router;
