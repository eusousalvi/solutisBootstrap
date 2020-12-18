const ObjectId = require("mongodb").ObjectID;
const Inputmask = typeof window != "undefined" ? require("inputmask") : {};

module.exports = {
  index(request, response) {
    response.render("./student/index.ejs", { Inputmask });
    global.db.collection(process.env.DB_STUDENT_SCHEMA).find();
  },

  create(request, response) {
    global.db
      .collection(process.env.DB_STUDENT_SCHEMA)
      .insertOne(request.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Salvo no Banco de Dados");
        response.redirect("/student/show");
      });
  },

  show(request, response) {
    global.db
      .collection(process.env.DB_STUDENT_SCHEMA)
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        response.render("./student/show.ejs", { data: results });
      });
  },

  getEdit(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_STUDENT_SCHEMA)
      .findOne(ObjectId(id))
      .then((results) => {
        response.render("./student/edit.ejs", { data: results });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  postEdit(request, response) {
    let id = request.params.id;
    let name = request.body.name;
    let surname = request.body.surname;
    let age = request.body.age;
    let rg = request.body.rg;

    global.db.collection(process.env.DB_STUDENT_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          surname,
          age,
          rg,
        },
      },
      (err, result) => {
        if (err) return response.send(err);
        response.redirect("/student/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  },

  delete(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_STUDENT_SCHEMA)
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log("Deletado do Banco de Dados!");
        response.redirect("/student/show");
      });
  },
};
