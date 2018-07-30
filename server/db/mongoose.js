const mongoose = require('mongoose');

//'mongodb://huncho:imamakeit4real@ds023303.mlab.com:23303/todo_app'
//process.env.MONGODB_URI

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://huncho:imamakeit4real@ds023303.mlab.com:23303/todo_app'|| 'mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true });

module.exports = {
  mongoose
}