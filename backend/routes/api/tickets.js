const express = require('express');
const asyncHandler = require('express-async-handler');
const { default: ticketReducer } = require('../../../frontend/src/store/tickets');
const { Ticket } = require('../../db/models');

const router = express.Router();

router.post('/', asyncHandler(async (req, res) => {
    const { ticket } = req.body;
    console.log('------->', ticket);
    const newTicket = await Ticket.create()
}))

module.exports = router;
