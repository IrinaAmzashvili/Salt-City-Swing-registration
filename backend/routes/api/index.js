const router = require("express").Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const classesRouter = require('./classes.js');
const ticketsRouter = require('./tickets.js');
const likesRouter = require('./likes.js');
const levelsRouter = require('./levels.js');
const imagesRouter = require('./images.js');

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/classes", classesRouter);
router.use("/tickets", ticketsRouter);
router.use("/likes", likesRouter);
router.use("/levels", levelsRouter);
router.use("/images", imagesRouter);

module.exports = router;
