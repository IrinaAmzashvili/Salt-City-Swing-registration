const router = require("express").Router();

router.post("/test", (req, res) => {
    res.json({ requestBody: res.body });
});

module.exports = router;
