const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();

// body-parser middlewear to send JSON data
app.use(bodyParser.json());

app.listen(3000, () => console.log('server started on Port 3000'));

// route for the post request.
app.post('/todos', (req, res) => {
  let todo = new Todo({
    title: req.body.text
  });

  todo.save()
      .then( doc =>  res.send(doc))
      .catch( err => res.status(400).send(err));

});