const ddbGeo = require('dynamodb-geo');
const AWS = require('aws-sdk');

// Set up AWS
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'ap-southeast-1'
});

exports.get = async (event, context, callback) => {
<<<<<<< HEAD
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

=======
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
  
>>>>>>> 6db6da3588cc427cf3a59356028e56e4aa6d8562
  callback(null, result);
};
