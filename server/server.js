const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectID} = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();

let port = process.env.PORT || 3000;

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
      })
      .catch( e => {
        res.status(400).send(e);
      })

});

// GET route
app.get('/todos', (req, res) => {
  Todo.find()
      .then((todo) => {
        res.send({todo});
      })
      .catch( e => {
        res.status(400).send(e);
      })

});

// GET todos /id
app.get('/todos/:id', (req, res) => {
 let id = req.params.id;

  if (!ObjectID.isValid(id)) {
   return res.status(404).send();
  }

  Todo.findById(id)
      .then( todo => {
        if (!todo) {
          res.status(404).send()
        } else {
          res.send({todo}) // same as todo: todo
        }
      }).catch( e => res.status(404).send())
});

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then( todo => {
    if(!todo) {
      return res.status(404).send();
    }
      res.status(200).send({todo});

  }).catch( err => res.status(400).send());
});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  // lodash method to pull out the properties we want from our doc.
  let body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // lodash method to check if the certain value is boolean or not.
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // query
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then( todo => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch( e => res.status(400).send());

});

app.listen(port, () => {
  console.log(`Server up on Port ${port}`);
});

module.exports = { app };