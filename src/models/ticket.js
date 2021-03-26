const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  planetId: String,
  departureAt: Date,
  userId: String,
  price: Number,
});

module.exports = mongoose.model("Ticket", ticketSchema);
