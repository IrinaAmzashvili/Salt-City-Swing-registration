const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const bcrypt = require("bcryptjs");

const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

router.put(
  "/:id/confirmPassword",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    const user = await User.scope("loginUser").findByPk(id);
    const validated = await user.validatePassword(password);

    if (validated) {
      return res.json({ success: true });
    } else {
      const error = new Error("Incorrect password.");
      error.errors = ["Incorrect password"];
      error.status = 400;
      error.title = "Incorrect password.";
      return next(error);
    }
  })
);

const validateSignup = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name.")
    .isLength({ min: 2 })
    .withMessage("First name must be a minimum of 2 characters long.")
    .isLength({ max: 30 })
    .withMessage("First name must be no more than 30 characters long."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your last name.")
    .isLength({ min: 2 })
    .withMessage("Last name must be a minimum of 2 characters long.")
    .isLength({ max: 30 })
    .withMessage("Last name must be no more than 30 characters long."),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email address.")
    .isEmail()
    .withMessage("Please provide a valid email address.")
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (!user) return true;
      if (user) throw new Error();
    })
    .withMessage("Email already in use."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  // check('vaxCardImg')
  //     .exists({ checkFalsy: true })
  //     .withMessage('Please provide an image of your vaccination card.'),
  handleValidationErrors,
];

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    //vaxCardImg, userPhoto,
    const { firstName, lastName, email, password, mailingList, superUser } =
      req.body;

    const user = await User.signup({
      firstName,
      lastName,
      email,
      password,
      mailingList,
      superUser,
    });

    await setTokenCookie(res, user);

    return res.json({ user });
  })
);

const validateUpdate = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your first name.")
    .isLength({ min: 2 })
    .withMessage("First name must be a minimum of 2 characters long.")
    .isLength({ max: 30 })
    .withMessage("First name must be no more than 30 characters long."),
  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide your last name.")
    .isLength({ min: 2 })
    .withMessage("Last name must be a minimum of 2 characters long.")
    .isLength({ max: 30 })
    .withMessage("Last name must be no more than 30 characters long."),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an email address.")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  // .custom(async (email) => {
  //     const user = await User.findOne({ where: { email } });
  //     if (!user) return true;
  //     if (user) throw new Error()
  // })
  // .withMessage('Email already in use.'),
  handleValidationErrors,
];

router.put(
  "/:id",
  validateUpdate,
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const edits = req.body;
    const user = await User.getCurrentUserById(id);
    const updatedUser = await user.update(edits);
    return res.json({ updatedUser });
  })
);

const validatePasswordUpdate = [
  check("currPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide current password."),
  check("newPassword")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  handleValidationErrors,
];

router.put(
  "/:id/updatePassword",
  validatePasswordUpdate,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.scope("loginUser").findByPk(id);
    const validated = await user.validatePassword(updates.currPassword);

    if (validated) {
      const hashedPassword = bcrypt.hashSync(updates.newPassword);
      await user.update({
        ...user,
        hashedPassword,
      });
      return res.json({ success: "Password updated successfully." });
    } else {
      const error = new Error("Incorrect password.");
      error.errors = ["Incorrect password"];
      error.status = 400;
      error.title = "Incorrect password.";
      return next(error);
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    const user = await User.scope("loginUser").findByPk(id);
    const validated = await user.validatePassword(password);

    if (validated) {
      await user.destroy();
      return res.json({ success: "user deleted" });
    } else {
      const error = new Error("Incorrect password.");
      error.errors = ["Incorrect password"];
      error.status = 400;
      error.title = "Incorrect password.";
      return next(error);
    }
  })
);

module.exports = router;
