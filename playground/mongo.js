// we need to MongoClient to connect to mongoDB
/*const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb://localhost:27017/ToDoApp', { useNewUrlParser: true }, (err, db) => {
  if (err) {
    return console.log('cannot coonect to MondoDB Server...');
  }
 //console.log('connected to Mongo Successfully!');
 //console.log(db);
 
  client.db('ToDoApp').collection('Todos').insertOne({
    text: 'this is the first property',
    completed: false
  }, (err, result) => {
    if (err) {
      return console.log('cannot connect to MongoDB', err);
    }

    console.log(result)
  }); 

  client.close();
 

 db.db('ToDoApp').collection('users').insertOne({
   name: 'Ash',
   age: 18,
   location: 'Pune'
 }, (err, res) => {
   console.log(res);
    if (err) {
      return console.log(err);
    }

    console.log(res.insertedCount);
    db.close();
 });

});*/

const MongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/';

  //insert Many!
/* MongoClient.connect(url, (err, db) => {

  if (err) throw err;

  let dbo = db.db('ToDoApp');
  let obj = [
    // we can specify the _id manually like this: 
    {_id: 369, name: 'ash', cool: true},
    {name: 'hailee', cool: true},
    {name: 'sierra', cool: true},
    {name: 'avicii', cool: true},
  ];

  dbo.collection('users').insertMany(obj, (err, res) => {

    if (err) throw err;

    console.log(JSON.stringify(res, undefined, 2));
    db.close();
  });
}); */

  // insert One!
 MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {

  if(err) throw err;

  let dbo = db.db('ToDoApp');
  dbo.collection('users').insertOne({
    name: 'tester'
  }, (err, res) => {
    if (err) throw err;

    console.log(res.ops[0]._id.getTimestamp());
    db.close();
  });
});  
