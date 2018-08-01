const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({
  
  email: {
    type: String,
    require: true, // have to put/specify this value
    trim: true, // remove the whitespaces from the string
    minlength: 5, // min length of it should be 3+
    unique: true,
    validate: {
      validator: validator.isEmail, // same as (value) => validator.isEmail(value);
      message: '{value} is not a valid E-Mail'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]

});

// restrict what properties we gon let users see once they make the request, toJSON is gon overwrite the generateauthtoken fucn.
UserSchema.methods.toJSON = function() {
  let user = this;
  let userObj = user.toObject();

  // now pick up the properties we want with lodash.
  return _.pick(userObj, ['_id', 'email']);
}

// generate the token
UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString();

  user.tokens.push({access, token});

  return user.save().then( () => {
    return token; // this returns a another promise but cuz we are already returning user.save() we dont need to do that.
  });
}

//validation GET /Users/me
UserSchema.statics.findByToken = function(token) {
  // uppercase U
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'secret');
  } catch (e) {
    return Promise.reject(); // u could pass a value of we want in it, itll act like the err in catch block
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });

}

UserSchema.pre('save', function(next) {
  let user= this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
})

UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;

  return User.findOne({email}).then( user => {
    if(!user) {
      return Promise.reject();
    }

    return new Promise( (resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
}

let User = mongoose.model('User', UserSchema); // we cant define methods in a model so we need to create a mongoose Shema.

module.exports = {
  User
}