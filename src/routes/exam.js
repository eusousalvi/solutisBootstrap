const express = require('express');
require('dotenv').config();
const examRoutes = express.Router();
const examController = require('../controllers/exams');

examRoutes.get('/exam/add', examController.index);

examRoutes.get('/exam/show', examController.show);

// examRoutes.get("/exam/show/:id", examController.showById);

examRoutes.post('/exam/show', examController.create);

examRoutes.get('/exam/edit/:id', examController.getEdit);

examRoutes.post('/exam/edit/:id', examController.postEdit);

examRoutes.get('/exam/delete/:id', examController.delete);

module.exports = examRoutes;
