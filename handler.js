'use strict';

module.exports.hello = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify( { message: `serverless23__${Date.now()}`, input: event, }, null, 2),
    };
};
