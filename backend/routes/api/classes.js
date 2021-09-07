const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Class, Category } = require("../../db/models");

const router = express.Router();

const validateClass = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Title required")
    .isLength({ min: 4, max: 255 })
    .withMessage("Title must be between 4 and 255 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description required"),
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage("Start date required")
    .isISO8601()
    .toDate()
    .withMessage("Start date must be a date"),
  check('cost')
    .exists({ checkFalsy: true })
    .withMessage("Cost required")
    .isNumeric()
    .withMessage("Cost must be a number")
    .isLength({ min: 0 })
    .withMessage("Cost cannot be a negative number"),
  check('categoryId')
    .exists({ checkFalsy: true })
    .withMessage("Level required")
    .isNumeric()
    .withMessage("CategoryId must be a number"),
  check('image')
    .exists({ checkFalsy: true })
    .withMessage("Image required"),
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
  validateClass,
  asyncHandler(async (req, res) => {
    const classInfo = req.body;
    const newClass = await Class.create(classInfo);
    return res.json({ newClass });
  })
);

module.exports = router;
