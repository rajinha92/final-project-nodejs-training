const mongoose = require("mongoose");

const rentSchema = new mongoose.Schema({
  vehicleId: String,
  departureAt: Date,
  returnAt: Date,
  userId: String,
  price: Number,
});

module.exports = mongoose.model("Rent", rentSchema);
