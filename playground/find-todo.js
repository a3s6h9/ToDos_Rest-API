const { MongoClient, ObjectID } = require('mongodb');

let url = 'mongodb://localhost:27017/'

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  if (err) throw err;


  let dbo = db.db('ToDoApp');

  /* dbo.collection('Todos').find({_id: new ObjectID("5b59af4c536c1d09e85d7fe8")}).toArray()
      .then( (docs) => {
        console.log(`Todos:`)
        console.log(JSON.stringify(docs, undefined, 2));
      })
      .catch( (err) => {
        console.log('unable to fetch the data from the MongoDB', err);
      });


  // count the number of Todos in our databse.
  dbo.collection('Todos').find().count()
     .then( (total) => {
       console.log(`Total Todos: ${total}`);
     })
     .catch( (err) => {
       throw err;
     }); */

  // exercise:
  dbo.collection('users').find({name: 'ash'}).toArray()
     .then( (docs) => {
       console.log(JSON.stringify(docs, undefined, 2));
     })
     .catch( (err) => {
       throw err;
     });
  //db.close();

});