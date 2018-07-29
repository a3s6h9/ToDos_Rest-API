const mongoose = require('mongoose');


let Todo = mongoose.model('Todos', {
  text: {
    type: String,
    require: true, // have to put/specify this value
    trim: true, // remove the whitespaces from the string
    minlength: 3 // min length of it should be 3+
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});


module.exports = {
  Todo
}