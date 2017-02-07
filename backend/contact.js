'use strict';

module.exports.sendEmail = function(event, context, callback) {
  console.log(event);

  const response = {
    statusCode: 200,
    /*headers: {
      "Location" : "http://website-cz-static.s3-website-us-east-1.amazonaws.com/"
    },*/
    body: JSON.stringify({ "message": "Hello World!" })
  };

  callback(null, response);
};
