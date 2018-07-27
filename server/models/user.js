const mongoose = require('mongoose');

let User = mongoose.model('Users', {
  name: {
    type: String,
    require: true, // have to put/specify this value
    trim: true, // remove the whitespaces from the string
    minlength: 3 // min length of it should be 3+
  },
  email: {
    type: String,
    require: true, // have to put/specify this value
    trim: true, // remove the whitespaces from the string
    minlength: 5 // min length of it should be 3+
  },
  location: {
    type: String,
    require: true, // have to put/specify this value
    trim: true, // remove the whitespaces from the string
    minlength: 1 // min length of it should be 3+
  }

});

module.exports = {
  User
}