const express = require('express');
const asyncHandler = require('express-async-handler');
const { Ticket, Class } = require('../../db/models');

const router = express.Router();

router.get('/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const tickets = await Ticket.findAll({
        where: { userId },
        include: Class,
    });
    res.json(tickets);
}));

router.post('/', asyncHandler(async (req, res) => {
    const ticket = req.body;
    const newTicket = await Ticket.create(ticket);
    res.json(newTicket);
}));

module.exports = router;
