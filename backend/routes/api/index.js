const asyncHandler = require('express-async-handler');
const router = require("express").Router();
const { User } = require('../../db/models');
const { restoreUser, requireAuth, setTokenCookie } = require('../../utils/auth.js');


// router.post("/test", (req, res) => {
//     res.json({ requestBody: res.body });
// });



module.exports = router;
