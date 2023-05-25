const express = require("express");
const controller = require("../Controllers/classesController");
const { checkAdmin } = require("../Middlewares/authMW");

const router = express.Router();

router.route("/classes/:id?")
        .all(checkAdmin)
        .get(controller.getAllClasses)
        .get(controller.getClassByID)
        .post(controller.addClass)
        .put(controller.updateClass)
        .delete(controller.deleteClass);


router.get("/classChildern/:id?", checkAdmin, controller.getClassChildren);

router.get("/classTeacher/:id?", checkAdmin, controller.getClassSupervisor);

module.exports = router;