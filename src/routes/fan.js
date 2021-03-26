const express = require("express");
const {
  listPlanets,
  listVehicles,
  rentVehicle,
  buyTicket,
} = require("../controllers/fan");
const checkAuthentication = require("../middlewares/checkAuthentication");
const router = express.Router();

router.get("/planets/:id?", checkAuthentication, listPlanets);
router.get("/vehicles/:id?", checkAuthentication, listVehicles);
router.post("/ticket/:id", checkAuthentication, buyTicket);
router.post("/rent/:id", checkAuthentication, rentVehicle);

module.exports = router;
