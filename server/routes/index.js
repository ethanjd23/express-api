const express = require("express");
const chirpsRouter = require("./chirps");

let router = express.router();

router.use('/api/chirps', chirpsRouter);

module.exports = router;