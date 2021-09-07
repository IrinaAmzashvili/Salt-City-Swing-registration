const express = require("express");
const asyncHandler = require("express-async-handler");
const { Ticket, Class } = require("../../db/models");

const router = express.Router();

router.get(
  "/:userId",
  asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const tickets = await Ticket.findAll({
      where: { userId },
      include: Class,
    });
    res.json(tickets);
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const ticket = req.body;
    const newTicket = await Ticket.create(ticket);
    res.json(newTicket);
  })
);

router.put(
  "/:ticketId",
  asyncHandler(async (req, res) => {
    const id = req.params.ticketId;
    const ticket = req.body;
    const originalTicket = await Ticket.findByPk(id);
    const updatedTicket = await originalTicket.update(ticket);
    res.json(updatedTicket);
  })
);

router.delete(
  "/:ticketId",
  asyncHandler(async (req, res) => {
    const id = req.params.ticketId;
    await Ticket.destroy({ where: { id } });
    res.json({ message: true });
  })
);

module.exports = router;
