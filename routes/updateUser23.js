const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, context, callback) => {
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: { id: event.pathParameters.id },
        ExpressionAttributeValues: {
            ":email": data.email,
            ":firstName": data.firstName,
            ":lastName": data.lastName,
            ":checked": data.checked,
            ":updatedAt": new Date().getTime()
        },
        UpdateExpression: "SET email = :email, firstName = :firstName, lastName = :lastName, updatedAt = :updatedAt",
        ReturnValues: "ALL_NEW"
    };

    dynamoDb.update(params, (error, result) => {
        if (error) { console.error(error); callback(null, { statusCode: error.statusCode || 501 }); return; }
        callback(null, { statusCode: 200, body: JSON.stringify(result.Attributes) });
    });
};