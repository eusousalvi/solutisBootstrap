const ObjectId = require('mongodb').ObjectID;

module.exports = {
  index(request, response) {
    response.render('./exam/index.ejs');
    global.db.collection(process.env.DB_EXAM_SCHEMA).find();
  },

  create(request, response) {
    global.db
      .collection(process.env.DB_EXAM_SCHEMA)
      .insertOne(request.body, (err, result) => {
        if (err) return console.log(err);

        console.log('Salvo no Banco de Dados');
        response.redirect('/exam/show');
      });
  },

  show(request, response) {
    global.db
      .collection(process.env.DB_EXAM_SCHEMA)
      .find()
      .toArray((err, results) => {
        if (err) return console.log(err);
        response.render('./exam/show.ejs', { data: results });
      });
  },

  showById(request, response) {
    const id = request.params.id;

    global.db
      .collection(process.env.DB_EXAM_SCHEMA)
      .findOne(ObjectId(id))
      .then((results) => {
        response.render('./exam/showById.ejs', { data: results });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  getEdit(request, response) {
    const id = request.params.id;

    global.db
      .collection(process.env.DB_EXAM_SCHEMA)
      .findOne(ObjectId(id))
      .then((data) => {
        response.render('./exam/edit.ejs', { data });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  postEdit(request, response) {
    const id = request.params.id;
    const title = request.body.title;
    const questions = request.body.questions;

    console.log(questions);

    global.db.collection(process.env.DB_EXAM_SCHEMA).updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          title,
          questions,
        },
      },
      (err, result) => {
        if (err) return response.send(err);
        response.redirect('/exam/show');
        console.log('Atualizado no Banco de Dados');
      },
    );
  },

  delete(request, response) {
    let id = request.params.id;

    global.db
      .collection(process.env.DB_EXAM_SCHEMA)
      .deleteOne({ _id: ObjectId(id) }, (err, result) => {
        if (err) return res.send(500, err);
        console.log('Deletado do Banco de Dados!');
        response.redirect('/exam/show');
      });
  },
};
