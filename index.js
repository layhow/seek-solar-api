'use strict';
var fs = require('fs');
var path = require('path');
var configureAWS = require('./src/store');

exports.get = function(event, context, callback) {
  configureAWS()
  .then(function(res) {
    var result = {
      statusCode: 200,
      body: JSON.stringify({message: res}),
      headers: {'content-type': 'application/json'}
    };
  
    callback(null, result);
  })
  
};
