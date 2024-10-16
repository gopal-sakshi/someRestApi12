const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, context, callback) => {
    // createUser is called by lambda function...
    // its not router.get('/createUser')
    // serverless.yml ---> functions ---> createUser ---> handler: routes/users.createUser
    console.log("event23 ====> ", event);
    console.log("body23 ====> ", event.body);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v4(),
            email: event.body.email ? event.body.email : `no-email__${Date.now()}@gmail.com`,
            firstName: event.body.firstName ? event.body.firstName : `firstName__${Date.now()}`,
            lastName: event.body.lastName ? event.body.lastName : `lastName__${Date.now()}`,
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }
    };

    dynamoDb.put(params, error => {
        if (error) { console.error(error); callback(null, { statusCode: error.statusCode || 501 }); return; }
        callback(null, { statusCode: 200, body: JSON.stringify(params.Item) });
    });
};