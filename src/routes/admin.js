const express = require("express");
const router = express.Router();
const checkAuthentication = require("./../middlewares/checkAuthentication");
const adminOnly = require("./../middlewares/adminOnly");
const { listTickets, listRented, exportCsv } = require("../controllers/admin");

router.get("/tickets", checkAuthentication, adminOnly, listTickets);
router.get("/vehicles", checkAuthentication, adminOnly, listRented);
router.get("/export-csv", checkAuthentication, adminOnly, exportCsv);

module.exports = router;
