const express = require("express");
const controller = require("../Controllers/authenticationController");

const router = express.Router();

router.post("/login/",controller.login)

module.exports=router;