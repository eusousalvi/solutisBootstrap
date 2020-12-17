const ObjectId = require("mongodb").ObjectID;

module.exports = {
  index(request, response) {
    response.render("./subjects/index.ejs");
    global.db.collection(process.env.DB_SUBJECTS_SCHEMA).find();
  },

  create(request, response) {
    global.db
      .collection(process.env.DB_SUBJECTS_SCHEMA)
      .save(request.body, (err, result) => {
        if (err) return console.log(err);

        console.log("Salvo no Banco de Dados");
        response.redirect("/subjects/show");
      });
  },

  show(request, response) {
    global.db
      .collection(process.env.DB_SUBJECTS_SCHEMA)
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        response.render("./subjects/show.ejs", { data: results });
      });
  },


  getEdit(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_SUBJECTS_SCHEMA)
      .findOne(ObjectId(id))
      .then((results) => {
        response.render("./subjects/edit.ejs", { data: results });
      })
      .catch((e)=>{
        console.log(e)
      });
  },

  postEdit(request, response) {
    let id = request.params.id;
    let title = request.body.title;
    let hours = request.body.hours;
    let name = request.body.name;
    let description = request.body.description;

    global.db.collection(process.env.DB_SUBJECTS_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          title: title,
          hours: hours,
          name: name,
          description: description
        },
      },
      (err, result) => {
        if (err) return response.send(err);
        response.redirect("/subjects/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  },

  delete(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_SUBJECTS_SCHEMA)
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log("Deletado do Banco de Dados!");
        response.redirect("/subjects/show");
      });
  },
};
