const express = require("express");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const subjectsRoutes = express.Router();
const subjectsController = require("../controllers/subjects");

subjectsRoutes.get("/subjects/add", subjectsController.index);

subjectsRoutes.get("/subjects/show", subjectsController.show);

subjectsRoutes.post("/subjects/show", subjectsController.create);

subjectsRoutes.get("/subjects/edit/:id", subjectsController.getEdit);

subjectsRoutes.post("/subjects/edit/:id", subjectsController.postEdit);

subjectsRoutes.get("/subjects/delete/:id", subjectsController.delete);

module.exports = subjectsRoutes;
