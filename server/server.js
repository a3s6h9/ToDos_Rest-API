const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();

// body-parser middlewear to send JSON data
app.use(bodyParser.json());


// route for the post request.
app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save()
      .then((doc) => {
        res.send(doc);
      }, (e) => {
        res.status(400).send(e);
      });

});

// GET route
app.get('/todos', (req, res) => {
  Todo.find()
      .then((doc) => {
        res.send(doc);
      }, (e) => {
        res.status(400).send(e);
      });

});

app.listen(5000, () => {
  console.log(`Server started on Port 5000`);
});

module.exports = { app };