const express = require("express");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const studentRoutes = express.Router();
const studentController = require("../controllers/student");

studentRoutes.get("/student/add", studentController.index);

studentRoutes.get("/student/show", studentController.show);

studentRoutes.post("/student/show", studentController.create);

studentRoutes.get("/student/edit/:id", studentController.getEdit);

studentRoutes.post("/student/edit/:id", studentController.postEdit);

studentRoutes.get("/student/delete/:id", studentController.delete);

module.exports = studentRoutes;
