const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

// wipe out the whole textbase before inserting One.
beforeEach( (done) => {
  Todo.remove({}).then( () => done());
});

// POST /todos :test
 describe('POST /todos', () => {
  
  it ('should create a Todo', (done) => {
    let text = 'yo i am the test ToDo';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200) // expect 200 status Code
      .expect( (res) => { // custom assertion
        console.log(res.body.title);
        expect(res.body.title).toBe(text);
      })
      .end( (err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then( (todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].title).toBe(text);
          done();
        }).catch( err => done(err));
      });
  }); 


// fail check
it('should not create a Todo /w invalid body', () => {


  request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end( (err, res) => {
      if(err) {
        return done(err);
      }

      Todo.find().then( (todos) => {
        expect(todos.length).toBe(0);
        done();
      }).catch( err => console.log(err));
    });
});


});

