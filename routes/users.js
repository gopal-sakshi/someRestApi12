"use strict";

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
  accessKeyId: 'chanti_gadu_local',                            // this doesnt have to be real Values
  secretAccessKey: 'idiot_movie',
  endpoint: "http://localhost:8002"               // make sure that dynamo service is running locally
});
const uuid = require("uuid");

const dynamoDb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

module.exports.createUser = (event, context, callback) => {
  let data;
  console.log('event ===> ', event);
  event?.data ? data = event?.data : event;
  console.log('data ===> ', data);
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v4(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    }
  };
  console.log('table23 ===> ', params.TableName);

  // dynamoDb.listTables({}, (err, data) => {
  //   if(err) return null
  //   if(data) {console.log(data); return data}
  // });

  docClient.put(params, error => {
    if (error) {
      console.error(error);
      callback(null, { statusCode: error.statusCode || 501 });
      return;
    }
    callback(null, { statusCode: 200, body: JSON.stringify(params.Item) });
  });
};

module.exports.updateUser = (event, context, callback) => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    },
    ExpressionAttributeValues: {
      ":email": data.email,
      ":firstName": data.firstName,
      ":lastName": data.lastName,
      ":checked": data.checked,
      ":updatedAt": new Date().getTime()
    },
    UpdateExpression:
      "SET email = :email, firstName = :firstName, lastName = :lastName, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW"
  };

  docClient.update(params, (error, result) => {
    if (error) {
      console.error(error);

      callback(null, {
        statusCode: error.statusCode || 501
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    });
  });
};

module.exports.deleteUser = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id
    }
  };

  docClient.delete(params, error => {
    if (error) {
      console.error(error);

      callback(null, {
        statusCode: error.statusCode || 501
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({})
    });
  });
};

module.exports.getUser = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: { email: event.email }
  };

  docClient.get(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, { statusCode: error.statusCode || 501 });
      return;
    }
    callback(null, { statusCode: 200, body: JSON.stringify(result.Item) });
  });
};

module.exports.getUsers = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE
  };

  docClient.scan(params, (error, result) => {
    if (error) {
      console.error(error);

      callback(null, {
        statusCode: error.statusCode || 501
      });
      return;
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    });
  });
};
