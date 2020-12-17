const express = require("express");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const institutionRoutes = express.Router();
const institutionController = require("../controllers/institution");

institutionRoutes.get("/institution", institutionController.index);

institutionRoutes.get("/institution/show", institutionController.show);

institutionRoutes.post("/institution/show", institutionController.store);

institutionRoutes.get("/institution/edit/:id", institutionController.edit);

institutionRoutes.post("/institution/edit/:id", institutionController.update);

institutionRoutes.get("/institution/delete/:id", institutionController.destroy);

module.exports = institutionRoutes;
