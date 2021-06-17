const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, vaxCardImg, userPhoto } = req.body;
    const user = await User.signup({ firstName, lastName, email, password, vaxCardImg, userPhoto });

    await setTokenCookie(res, user);

    return res.json({ user });
}))

module.exports = router;
