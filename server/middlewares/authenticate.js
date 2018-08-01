let {User} = require('./../models/user');

// authentication middlewear
let authenticate = (req, res, next) => {
  let token = req.header('x-auth');

  User.findByToken(token).then( user => {
    if(!user) {
      return Promise.reject(); // success code is never gon get executed it user ain't valid, cuz of the rej Promise()
    }

    req.user = user;
    req.token = token;
    next();

  }).catch( e => {
    res.status(401).send(e);
  });
}

module.exports = {
  authenticate
}
