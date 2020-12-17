const ObjectId = require("mongodb").ObjectID;

module.exports = {
  index(request, response) {
    response.render("./employee/index.ejs");
    global.db.collection(process.env.DB_EMPLOYEE_SCHEMA).find();
  },

  create(request, response) {
    global.db
      .collection(process.env.DB_EMPLOYEE_SCHEMA)
      .insertOne(request.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Salvo no Banco de Dados");
        response.redirect("/employee/show");
      });
  },

  show(request, response) {
    global.db
      .collection(process.env.DB_EMPLOYEE_SCHEMA)
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        response.render("./employee/show.ejs", { data: results });
      });
  },

  showById(request, response) {
    const { id } = request.params;
    global.db
      .collection(process.env.DB_EMPLOYEE_SCHEMA)
      .findOne(ObjectId(id))
      .then((result) =>
        response.render("./employee/showById.ejs", { data: result })
      )
      .catch((err) => console.log(err));
  },

  getEdit(request, response) {
    const { id } = request.params;

    global.db
      .collection(process.env.DB_EMPLOYEE_SCHEMA)
      .findOne(ObjectId(id))
      .then((result) =>
        response.render("./employee/edit.ejs", { data: result })
      )
      .catch((err) => console.log(err));
  },

  postEdit(request, response) {
    const { id } = request.params;
    const { name, lastname, matricula } = request.body;
    const { birthday, setor, salario } = request.body;

    global.db.collection(process.env.DB_EMPLOYEE_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name,
          lastname,
          matricula,
          birthday,
          setor,
          salario,
        },
      },
      (err, result) => {
        if (err) return response.send(err);
        response.redirect("/employee/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  },

  delete(request, response) {
    const { id } = request.params;

    global.db
      .collection(process.env.DB_EMPLOYEE_SCHEMA)
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log("Deletado do Banco de Dados!");
        response.redirect("/employee/show");
      });
  },
};
