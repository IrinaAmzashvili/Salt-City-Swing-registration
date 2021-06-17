const asyncHandler = require('express-async-handler');
const router = require("express").Router();
const { User } = require('../../db/models');
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);


module.exports = router;
