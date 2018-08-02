
let env = process.env.NODE_ENV || 'developement';

if (env === 'developement' || env === 'test') {
  let config = require('./config.json');
  let envConfig = config[env];

  Object.keys(envConfig).forEach( key => {
    process.env[key] = envConfig[key];
  });
}