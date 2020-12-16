const express = require("express");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const expressLayouts = require("express-ejs-layouts");
const userRoutes = require("./src/routes/user");
const teacherRoutes = require("./src/routes/teacher");


const uri = `mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PASS}@clustersolutiscourse.vamb7.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(userRoutes);
app.use(teacherRoutes);


MongoClient.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) return console.log(err);
    global.db = client.db(process.env.DB_NAME);

    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  }
);