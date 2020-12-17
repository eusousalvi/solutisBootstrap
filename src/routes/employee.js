const express = require("express");
require("dotenv").config();
const ObjectId = require("mongodb").ObjectID;
const employee = express.Router();
const employeeController = require("../controllers/employees");

employee.get("/employee/add", employeeController.index);

employee.get("/employee/show", employeeController.show);

employee.get("/employee/show/:id", employeeController.showById);

employee.post("/employee/show", employeeController.create);

employee.get("/employee/edit/:id", employeeController.getEdit);

employee.post("/employee/edit/:id", employeeController.postEdit);

employee.get("/employee/delete/:id", employeeController.delete);

module.exports = employee;
