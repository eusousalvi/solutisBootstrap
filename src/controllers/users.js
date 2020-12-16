const ObjectId = require("mongodb").ObjectID;

module.exports = {
  index(request, response) {
    response.render("./user/index.ejs");
    global.db.collection(process.env.DB_USER_SCHEMA).find();
  },

  create(request, response) {
    //* criar ou utilizar a coleção usuario, que irá armazenar nossos dados
    global.db
      .collection(process.env.DB_USER_SCHEMA)
      .save(request.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Salvo no Banco de Dados");
        response.redirect("/user/show");
      });
  },

  show(request, response) {
    global.db
      .collection(process.env.DB_USER_SCHEMA)
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        response.render("./user/show.ejs", { data: results });
      });
  },

  getEdit(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_USER_SCHEMA)
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        response.render("./user/edit.ejs", { data: result });
      });
  },

  postEdit(request, response) {
    let id = request.params.id;
    let name = request.body.name;
    let surname = request.body.surname;

    global.db.collection(process.env.DB_USER_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          surname: surname,
        },
      },
      (err, result) => {
        if (err) return response.send(err);
        response.redirect("/user/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  },

  delete(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_USER_SCHEMA)
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log("Deletado do Banco de Dados!");
        response.redirect("/user/show");
      });
  },
};
