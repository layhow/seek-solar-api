'use strict';
require('dotenv').config()
var fs = require('fs');
var path = require('path');
var AWS = require('aws-sdk')
const ddbGeo = require('dynamodb-geo');

exports.get = async (event, context, callback) => {
  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "ap-southeast-1",
  });

  const ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint(process.env.ENDPOINT) });
  const dbconfig = new ddbGeo.GeoDataManagerConfiguration(ddb, process.env.TABLE_NAME);
  const myGeoTableManager = new ddbGeo.GeoDataManager(dbconfig);

  let coordData = await myGeoTableManager.queryRadius({
    RadiusInMeter: 10000,
    CenterPoint: {
        latitude: 2.993354,
        longitude: 101.528086
    }
  })
  
  var result = {
    statusCode: 200,
    body: JSON.stringify({message: coordData}),
    headers: {'content-type': 'application/json'}
  };
  
  callback(null, result);
};
