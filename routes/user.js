const express = require('express');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectID;
const userRoutes = express.Router();

userRoutes.get('/', (req, res) => {
  res.render('user/index.ejs');
});

userRoutes.get('/user/show', (req, res) => {
  db.collection(process.env.DB_USER_SCHEMA)
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render('user/show.ejs', { data: results });
    });
});

userRoutes.post('/user/show', (req, res) => {
  db.collection(process.env.DB_USER_SCHEMA).insertOne(
    req.body,
    (err, result) => {
      if (err) return console.log(err);

      console.log('Saved on Database');
      res.redirect('/user/show');
    },
  );
});

userRoutes.get('/user/edit/:id', (req, res) => {
  const id = req.params.id;

  db.collection(process.env.DB_USER_SCHEMA)
    .find(ObjectId(id))
    .toArray((err, result) => {
      if (err) return res.send(err);
      res.render('user/edit.ejs', { data: result });
    });
});

userRoutes.post('/user/edit/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const surname = req.body.surname;

  db.collection(process.env.DB_USER_SCHEMA).updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name,
        surname,
      },
    },
    (err, result) => {
      if (err) return res.sender(err);
      res.redirect('/user/show');
      console.log('Database Updated');
    },
  );
});

userRoutes.get('/user/delete/:id', (req, res) => {
  const id = req.params.id;

  db.collection(process.env.DB_USER_SCHEMA).deleteOne(
    { _id: ObjectId(id) },
    (err, result) => {
      if (err) return res.send(500, err);
      console.log('User deleted from the Database!');
      res.redirect('/user/show');
    },
  );
});

module.exports = userRoutes;
