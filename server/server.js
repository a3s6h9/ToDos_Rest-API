const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

let app = express();

const port = process.env.PORT || 5000;

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
      res.status(200).send(todo);
      
  }).catch( err => res.status(400).send());
})

app.listen(port, () => {
  console.log(`Server up on Port ${port}`);
});

module.exports = { app };