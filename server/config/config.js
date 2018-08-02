
let env = process.env.NODE_ENV || 'developement';

if (env === 'developement') {
  process.env.PORT = 8000;
  process.env.MONGOLAB_URI = 'mongodb://localhost:27017/ToDoApp';
} else if (env === 'test') {
  process.env.PORT = 8000;
  process.env.MONGOLAB_URI = 'mongodb://localhost:27017/ToDoAppTest';
}
