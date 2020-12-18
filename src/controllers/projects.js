const ObjectId = require("mongodb").ObjectID;

module.exports = {
  index(request, response) {
    response.render("./projects/index.ejs");
    global.db.collection(process.env.DB_PROJECTS_SCHEMA).find();
  },

  create(request, response) {
    const date = new Date(Date.now());
    let dataFormatada =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    const data = {
      ...request.body,
      creationDate: dataFormatada,
    };

    global.db
      .collection(process.env.DB_PROJECTS_SCHEMA)
      .save(data, (err, result) => {
        if (err) return console.log(err);

        console.log("Salvo no Banco de Dados");
        response.redirect("/projects/show");
      });
  },

  show(request, response) {
    global.db
      .collection(process.env.DB_PROJECTS_SCHEMA)
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        response.render("./projects/show.ejs", { data: results });
      });
  },

  showById(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_PROJECTS_SCHEMA)
      .findOne(ObjectId(id))
      .then((results) => {
        response.render("./projects/showById.ejs", { data: results });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  getEdit(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_PROJECTS_SCHEMA)
      .findOne(ObjectId(id))
      .then((results) => {
        console.log(results);
        response.render("./projects/edit.ejs", { data: results });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  postEdit(request, response) {
    let id = request.params.id;
    let title = request.body.title;
    let description = request.body.description;
    let banner = request.body.banner;
    const date = new Date(Date.now());
    let dataFormatada =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    global.db.collection(process.env.DB_PROJECTS_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          title,
          description,
          banner,
          creationDate: dataFormatada,
        },
      },
      (err, result) => {
        if (err) return response.send(err);
        response.redirect("/projects/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  },

  delete(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_PROJECTS_SCHEMA)
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log("Deletado do Banco de Dados!");
        response.redirect("/projects/show");
      });
  },
};
