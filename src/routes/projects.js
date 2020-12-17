const express = require("express");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const teacherRoutes = express.Router();
const projectsController = require("../controllers/projects");

teacherRoutes.get("/projects/add", projectsController.index);

teacherRoutes.get("/projects/show", projectsController.show);

teacherRoutes.get("/projects/show/:id", projectsController.showById);

teacherRoutes.post("/projects/show", projectsController.create);

teacherRoutes.get("/projects/edit/:id", projectsController.getEdit);

teacherRoutes.post("/projects/edit/:id", projectsController.postEdit);

teacherRoutes.get("/projects/delete/:id", projectsController.delete);

module.exports = teacherRoutes;
