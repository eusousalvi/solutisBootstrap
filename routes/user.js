const express = require("express");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const userRoutes = express.Router();
const userController = require("../src/controllers/users.js");

userRoutes.get("/", userController.index);

userRoutes.get("/user/show", userController.show);

userRoutes.post("/user/show", userController.create);

userRoutes.get("/user/edit/:id", userController.getEdit);

userRoutes.post("/user/edit/:id", userController.postEdit);

userRoutes.get("/user/delete/:id", userController.delete);

module.exports = userRoutes;
