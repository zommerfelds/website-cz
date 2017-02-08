'use strict';

module.exports.sendEmail = function(event, context, callback) {
  console.log(event);

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*", // required for CORS support to work
    },
    body: JSON.stringify({ "message": "Hello World!" })
  };

  callback(null, response);
};
