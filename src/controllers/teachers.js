const ObjectId = require("mongodb").ObjectID;

module.exports = {
  index(request, response) {
    response.render("./teacher/index.ejs");
    global.db.collection(process.env.DB_TEACHER_SCHEMA).find();
  },

  create(request, response) {
    global.db
      .collection(process.env.DB_TEACHER_SCHEMA)
      .save(request.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Salvo no Banco de Dados");
        response.redirect("/teacher/show");
      });
  },

  show(request, response) {
    global.db
      .collection(process.env.DB_TEACHER_SCHEMA)
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        response.render("./teacher/show.ejs", { data: results });
      });
  },

  showById(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_TEACHER_SCHEMA)
      .findOne(ObjectId(id))
      .then((results) => {
        response.render("./teacher/showById.ejs", { data: results });
      })
      .catch((e)=>{
        console.log(e)
      });
  },

  getEdit(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_TEACHER_SCHEMA)
      .findOne(ObjectId(id))
      .then((results) => {
        response.render("./teacher/edit.ejs", { data: results });
      })
      .catch((e)=>{
        console.log(e)
      });
  },

  postEdit(request, response) {
    let id = request.params.id;
    let name = request.body.name;
    let surname = request.body.surname;
    let education = request.body.education;
    let salary = request.body.salary;

    global.db.collection(process.env.DB_TEACHER_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          surname: surname,
          education: education,
          salary: salary,
        },
      },
      (err, result) => {
        if (err) return response.send(err);
        response.redirect("/teacher/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  },

  delete(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_TEACHER_SCHEMA)
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log("Deletado do Banco de Dados!");
        response.redirect("/teacher/show");
      });
  },
};
