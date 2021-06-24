const express = require('express');
const asyncHandler = require('express-async-handler');
const { Ticket } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const ticket = req.body;
    const newTicket = await Ticket.create(ticket);
    res.json(newTicket);
}));

module.exports = router;
