const express = require('express');
const asyncHandler = require('express-async-handler');
const { Like } = require('../../db/models');

const router = express.Router();

router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const likes = await Like.findAll({ where: { userId } });
    res.json(likes);
}));

router.post('/', asyncHandler(async (req, res) => {

    const likeInfo = req.body;
    console.log('------------->', likeInfo)
    const like = await Like.create(likeInfo);
    res.json(like);
}));

router.delete('/:likeId', asyncHandler(async (req, res) => {
    const id = req.params.likeId;
    const deletedLike = await Like.destroy({ where: { id } });
    res.json(deletedLike);
}));

module.exports = router;
