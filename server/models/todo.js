const mongoose = require('mongoose');


let Todo = mongoose.model('Todos', {
  title: {
    type: String,
    require: true, // have to put/specify this value
    trim: true, // remove the whitespaces from the string
    minlength: 3 // min length of it should be 3+
  },
  completed: {
    type: Boolean,
    default: false
  },
  completed_at: {
    type: Number,
    default: null
  }
});


module.exports = {
  Todo
}