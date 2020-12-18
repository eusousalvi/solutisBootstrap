const express = require("express");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const expressLayouts = require("express-ejs-layouts");
const teacherRoutes = require("./src/routes/teacher");
const examRoutes = require("./src/routes/exam");
const institutionRoutes = require("./src/routes/institution");
const employeeRoutes = require("./src/routes/employee");
const projectsRoutes = require("./src/routes/projects");
const studentRoutes = require("./src/routes/student");
const subjectsRoutes = require("./src/routes/subjects");

const port = 4000;

const uri = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@clustersolutiscourse.vamb7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(institutionRoutes);
app.use(employeeRoutes);
app.use(teacherRoutes);
app.use(examRoutes);
app.use(projectsRoutes);
app.use(studentRoutes);
app.use("/static", express.static(__dirname + "/src"));
app.use("/dist", express.static(__dirname + "/node_modules/inputmask/dist"));
app.use(subjectsRoutes);

MongoClient.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    global.db = client.db(process.env.DB_NAME);

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
);
