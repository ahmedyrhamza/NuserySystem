const express = require("express");
const controller = require("../Controllers/childrenController");
const {checkAdmin}=require("../Middlewares/authMW")

const router = express.Router();

router.route("/children/:id?")
        .all(checkAdmin)
        .get(controller.getAllChildren)
        .get(controller.getChildByID)
        .post(controller.addChild)
        .put(controller.updateChild)
        .delete(controller.deleteChild);


module.exports = router;