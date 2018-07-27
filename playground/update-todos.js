const { MongoClient, ObjectID } = require('mongodb');

let url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;

  let dbo = db.db('ToDoApp');

  /* dbo.collection('Todos').findOneAndUpdate({
    _id: new ObjectID("5b5ae812b02fb246ca2d238c")
  }, {
    $set: {
      completed: false
    }
  }, {
    returnOrigional: false
  })
  .then( res => console.log(res))
  .catch( err => console.log(err)); */

  // use the $inc operator
  dbo.collection('users').findOneAndUpdate({
    _id: new ObjectID("5b5aed56b02fb246ca2d24e6")
  }, {
    $set: {
      name: `Shreya`,
    },
    $inc: {age: 1} // increment age by one, -1 to decrement age by 1
  }, {
    returnOrigional: false
  })
  .then( res => console.log(res))
  .catch( err => console.log(err));


  db.close();
  
});