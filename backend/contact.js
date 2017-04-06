'use strict';

const SNS = require('aws-sdk/clients/sns');
const snsRegion = process.env.AWS_REGION;
const sns = new SNS({snsRegion});
const gRecaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';
const rp = require('request-promise');
const lambdaHandler = require('lambda-handler-as-promised');

console.log('INIT => snsRegion:', snsRegion);
console.log('INIT => process.env.CF_WebsiteChristianContact:', process.env.CF_WebsiteChristianContact);

function makeResponse(status, message) {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin' : process.env.CORS_ORIGIN,
    },
    body: (message ? JSON.stringify({message}) : '{}')
  };
}

const mandatoryFields = ['name', 'email', 'message', 'g-recaptcha-response'];

function snsPublish(name, email, message) {
  const snsMessage = `Name: ${name}\nE-mail: ${email}\n\n` + message;

  const params = {
    Message: snsMessage,
    Subject: `New contact request (${name})`,
    TopicArn: process.env.CF_WebsiteChristianContact
  };

  return sns.publish(params).promise();
}

function checkGRecaptcha(recaptchaResponse) {
  const options = {
    method: 'POST',
    uri: gRecaptchaUrl,
    form: {
      secret: process.env.RECAPTCHA_SECRET,
      response: recaptchaResponse,
      // remoteip: 'TODO: add this if it filter needs improvement'
    }
  };

  return rp(options).then(function (body) {
    console.log('reCAPTCHA API response:', body);
    if (!JSON.parse(body).success) {
      return Promise.reject({status: 400, message: 'reCAPTCHA rejected'});
    }
  });
}

module.exports.sendEmail = lambdaHandler((event) => {
  console.log('Received event:', event);

  const contactForm = JSON.parse(event.body);
  mandatoryFields.forEach((field) => {
    if (contactForm[field] === undefined) {
      return makeResponse(400);
    }
  });

  return checkGRecaptcha(contactForm['g-recaptcha-response'])
    .then(() => snsPublish(contactForm.name, contactForm.email, contactForm.message))
    .then(() => makeResponse(200))
    .catch({status: 400}, e => makeResponse(400, e.message));
});
