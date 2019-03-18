const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');

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
    RadiusInMeter: 10000,
    CenterPoint: {
      latitude: 2.992481,
      longitude: 101.524913
    }
  })

  console.log(coordData);


  // console.log(coordData)
  var result = {
    statusCode: 200,
    body: JSON.stringify({ message: coordData }),
    //headers: {'content-type': 'application/json'}
  };

  callback(null, result);
};
