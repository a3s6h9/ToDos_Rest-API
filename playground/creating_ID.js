// now we gon require MongoClient and ObjectID properties from mongodb the destructuring way!
const {MongoClient, ObjectID} = require('mongodb');

// lets create a new object _id 
let myID = new ObjectID();
console.log(myID);