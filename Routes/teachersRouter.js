const express = require("express");
const controller = require("../Controllers/teachersController");
const { checkAdmin, checkTeacher, checkAdminAndTeacher } = require("../Middlewares/authMW");

const router = express.Router();

router.route("/teachers/:id?")       // ? <- optional - : variable not a part of the route
        .all(checkAdmin)
        .get(controller.getAllTeachers)    // first stage array of call-back functions use for validation -> use package: express-validator
        .post(controller.addTeacher)   
        .put(checkTeacher, controller.updateTeacher)
        .delete(checkAdminAndTeacher, controller.deleteTeacher)
        .get(checkAdminAndTeacher, controller.getTeacherById);

module.exports = router;