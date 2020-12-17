const ObjectId = require("mongodb").ObjectID;

module.exports = {
  index(request, response) {
    response.render("./institution/index.ejs");
    global.db.collection(process.env.DB_INSTITUTION_SCHEMA).find();
  },

  store(request, response) {
    const { name, cnpj, telephone, situationInput } = request.body;
    const situation = situationInput === undefined ? "Inativo" : "Ativo";
    const institutionData = {
      name,
      cnpj,
      telephone,
      situation,
    };
    global.db
      .collection(process.env.DB_INSTITUTION_SCHEMA)
      .insertOne(institutionData, (err, results) => {
        if (err) return response.send(err);
        console.log("salvo no Banco de Dados.");
        response.redirect("/institution/show");
      });
  },

  show(request, response) {
    global.db
      .collection(process.env.DB_INSTITUTION_SCHEMA)
      .find()
      .toArray((err, results) => {
        if (err) return response.send(err);
        response.render("./institution/show.ejs", { data: results });
      });
  },

  edit(request, response) {
    const id = request.params.id;

    global.db
      .collection(process.env.DB_INSTITUTION_SCHEMA)
      .findOne(ObjectId(id))
      .then((result) => {
        response.render("./institution/edit.ejs", { data: result });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  update(request, response) {
    const id = request.params.id;


    const { name, cnpj, telephone, situationInput } = request.body;
    const situation = situationInput === undefined ? "Inativo" : "Ativo";

    global.db.collection(process.env.DB_INSTITUTION_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          name: name,
          cnpj: cnpj,
          situation: situation,
          telephone: telephone,
        },
      },
      (err, result) => {
        if (err) return response.send(err);
        response.redirect("/institution/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  },

  destroy(request, response) {
    const id = request.params.id;

    global.db
      .collection(process.env.DB_INSTITUTION_SCHEMA)
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return response.send(500, err);
        console.log("Deletado do Banco de Dados");
        response.redirect("/institution/show");
      });
  },
};
