const { MongoClient, ObjectID } = require('mongodb');

let url = 'mongodb://localhost:27017/';

MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {

  if (err) throw err;

  console.info('connected to MongoDB...');
  let dbo = db.db('ToDoApp');

// Delete Many
/*   dbo.collection('Todos').deleteMany({text: 'fuck yo hoe!'})
     .then( (res) => {
       console.log(res.result);
     })
     .catch( err => console.log(err)); */


// Delete One
/* dbo.collection('Todos').deleteOne({text: 'fuck yo hoe!'})
.then( (res) => {
  console.log(res.result);
})
.catch( err => console.log(err));
 */


// Find one and delete
/* dbo.collection('Todos').findOneAndDelete({completed: false})
.then( (res) => {
  console.log(res);
})
.catch( err => console.log(err)); */




/* fuck with the users collection */

// delete one user and find that user
 dbo.collection('users').findOneAndDelete({_id: new ObjectID("5b59f3a9b1df4e1424a9d7ad")})
.then( (res) => {
  console.log(res);
})
.catch( err => console.log(err));
 

 // delete many users
/* dbo.collection('users').deleteMany({name: 'ash'})
.then( (res) => {
  console.log(res.result);
})
.catch( err => console.log(err));
 */
  //db.close();

});