var express = require('express');
const routes = express.Router();

const task = require('./task');
console.log("in index.js")
routes.use('/task', task.route);

const auth = require('./auth');

routes.use('/auth', auth.route);

module.exports = {
  modules: {
    task,
    auth
  },
  routes
}

