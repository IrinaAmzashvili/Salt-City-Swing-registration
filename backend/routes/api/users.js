const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your first name.')
        .isLength({ min: 2 })
        .withMessage('First name must be a minimum of 2 characters long.')
        .isLength({ max: 30 })
        .withMessage('First name must be no more than 30 characters long.'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide your last name.')
        .isLength({ min: 2 })
        .withMessage('Last name must be a minimum of 2 characters long.')
        .isLength({ max: 30 })
        .withMessage('Last name must be no more than 30 characters long.'),
        // must check for unique username
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an email address.')
        .isEmail()
        .withMessage('Please provide a valid email address.')
        .custom(async (email) => {
            const user = await User.findOne({ where: { email } });
            if (!user) return true;
        })
        .withMessage('Email already in use'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),
    check('vaxCardImg')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an image of your vaccination card.'),
    handleValidationErrors,
];

router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, vaxCardImg, userPhoto } = req.body;
    const user = await User.signup({ firstName, lastName, email, password, vaxCardImg, userPhoto });

    await setTokenCookie(res, user);

    return res.json({ user });
}))

module.exports = router;
