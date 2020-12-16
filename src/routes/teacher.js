const express = require("express");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const teacherRoutes = express.Router();
const teacherController = require("../controllers/teachers");

teacherRoutes.get("/teacher/add", teacherController.index);

teacherRoutes.get("/teacher/show", teacherController.show);

teacherRoutes.get("/teacher/show/:id", teacherController.showById);

teacherRoutes.post("/teacher/show", teacherController.create);

teacherRoutes.get("/teacher/edit/:id", teacherController.getEdit);

teacherRoutes.post("/teacher/edit/:id", teacherController.postEdit);

teacherRoutes.get("/teacher/delete/:id", teacherController.delete);

module.exports = teacherRoutes;
