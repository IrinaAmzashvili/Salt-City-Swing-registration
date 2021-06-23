const asyncHandler = require('express-async-handler');
const router = require("express").Router();
const { User } = require('../../db/models');
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const classesRouter = require('./classes.js');

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/classes", classesRouter);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
});

module.exports = router;
