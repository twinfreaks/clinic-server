var changeCase = require('change-case'),
  express = require('express'),
  routes = require('require-dir')();

module.exports = function (app) {
  'use strict';

  Object.keys(routes).forEach(function (routeName) {
    var router = express.Router();

    require('./' + routeName)(router);
    app.use('/' + changeCase.paramCase(routeName), router);
  });
};