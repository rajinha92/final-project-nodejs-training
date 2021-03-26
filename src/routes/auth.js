const express = require("express");
const router = express.Router();
const { register, auth } = require("./../controllers/auth");

router.post("/", auth);
router.post("/register", register);

module.exports = router;
