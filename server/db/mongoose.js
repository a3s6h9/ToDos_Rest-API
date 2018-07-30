const mongoose = require('mongoose');

//'mongodb://huncho:imamakeit4real@ds023303.mlab.com:23303/todo_app'

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true });

module.exports = {
  mongoose
}