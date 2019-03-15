'use strict';
require('dotenv').config()
var fs = require('fs');
var path = require('path');
var AWS = require('aws-sdk')
const ddbGeo = require('dynamodb-geo');

exports.get = function(event, context, callback) {
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "ap-southeast-1",
  });

  const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint(process.env.ENDPOINT) });
  const dbconfig = new ddbGeo.GeoDataManagerConfiguration(ddb, process.env.TABLE_NAME);
  const myGeoTableManager = new ddbGeo.GeoDataManager(dbconfig);

  myGeoTableManager.queryRectangle({
      MinPoint: {
          latitude: 2.993943,
          longitude: 101.52711
      },
      MaxPoint: {
          latitude: 2.994002,
          longitude: 101.528993
      }
  })
  .then(function(response) {
    var result = {
      statusCode: 200,
      body: JSON.stringify({message: response}),
      headers: {'content-type': 'application/json'}
    };

    callback(null, result);
  });
};
