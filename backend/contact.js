'use strict';

const SNS = require('aws-sdk/clients/sns');
const snsRegion = process.env.AWS_REGION;
const sns = new SNS({snsRegion});

console.log('snsRegion:', snsRegion);
console.log('process.env.CF_WebsiteChristianContact:', process.env.CF_WebsiteChristianContact);

function makeResponse(status) {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin' : '*', // required for CORS support to work
    },
    body: '{}'
  };
}

const mandatoryFields = ['name', 'email', 'message'];

module.exports.sendEmail = function(event, context, callback) {
  console.log('Received event:', event);

  const contactForm = JSON.parse(event.body);
  mandatoryFields.forEach((field) => {
    if (contactForm[field] === undefined) {
      callback(null, makeResponse(400));
      return;
    }
  });

  console.log('Contact data:', contactForm);

  const message = `Name: ${contactForm.name}\nE-mail: ${contactForm.email}\n\n`
    + contactForm.message;

  const params = {
    Message: message,
    Subject: `New contact request (${contactForm.name})`,
    TopicArn: process.env.CF_WebsiteChristianContact
  };

  sns.publish(params, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      callback(err);
    }
    else {
      callback(null, makeResponse(200));
    }
  });
};
