const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');
require('dotenv').config();

// Set up AWS
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'ap-southeast-1'
});

exports.get = async (event, context, callback) => {
  // Use a local DB for the example.
  const ddb = new AWS.DynamoDB(AWS.Config);

  // Configuration for a new instance of a GeoDataManager. Each GeoDataManager instance represents a table
  const config = new ddbGeo.GeoDataManagerConfiguration(ddb, process.env.TABLE_NAME);
  config.hashKeyLength = 3;

  // Instantiate the table manager
  const capitalsManager = new ddbGeo.GeoDataManager(config);

  var coordData = await capitalsManager.queryRadius({
    RadiusInMeter: 20,
    CenterPoint: {
      latitude: 2.992481,
      longitude: 101.524913
    }
  })

  const nearbyCoords = coordData.map(item => {
    const obj = restructureData(item.otherPoints.L)
    return obj;
  })

  var result = {
    statusCode: 200,
    body: JSON.stringify({ message: nearbyCoords }),
  };

  callback(null, result);
};

function restructureData(dataPoints) {
    var resObj = dataPoints.map(point => {
      const coordinates = {}

      coordinates.lat = point.M.lat.N;
      coordinates.long = point.M.long.N;

      return coordinates;
    })

    console.log(resObj);
    return resObj;
}
