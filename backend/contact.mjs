// The AWS SDK is included by default in Lambda, so we don't list it as a dependency
// TODO: this is currently broken: new runtime is using SDK v3
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import * as rp from 'request-promise';
import 'validator';
import 'bluebird';

// const snsRegion = process.env.AWS_REGION;
const sns = new SNSClient();
const gRecaptchaUrl = 'https://www.google.com/recaptcha/api/siteverify';

// console.log('INIT => snsRegion:', snsRegion);
console.log('INIT => process.env.CF_WebsiteChristianContact:', process.env.CF_WebsiteChristianContact);

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function makeResponse(status, message) {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': process.env.CORS_ORIGIN,
    },
    body: (message ? JSON.stringify({ message }) : '{}'),
  };
}

const mandatoryFields = ['name', 'email', 'message', 'g-recaptcha-response'];

function snsPublish(name, email, message) {
  const snsMessage = `Name: ${name}\nE-mail: ${email}\n\n${message}`;

  /*const params = {
    Message: snsMessage,
    Subject: `New contact request (${name})`,
    TopicArn: process.env.CF_WebsiteChristianContact,
  };

  return sns.publish(params).promise();*/

  return snsClient.send(
    new PublishCommand({
      Message: message,
      TopicArn: process.env.CF_WebsiteChristianContact,
    }),
  );
}

function checkGRecaptcha(recaptchaResponse) {
  const options = {
    method: 'POST',
    uri: gRecaptchaUrl,
    form: {
      secret: process.env.RECAPTCHA_SECRET,
      response: recaptchaResponse,
      // remoteip: 'add this if it filter needs improvement'
    },
  };

  return rp(options).then((body) => {
    console.log('reCAPTCHA API response:', body);
    if (!JSON.parse(body).success) {
      throw new ApiError('reCAPTCHA rejected', 400);
    }
  });
}

function validateContent(contactForm) {
  mandatoryFields.forEach((field) => {
    if (typeof contactForm[field] !== 'string' || contactForm[field] === '') {
      throw new ApiError(`${field} must be non-empty string`, 400);
    }
  });
  if (!validator.isEmail(contactForm.email)) {
    throw new ApiError('e-mail is invalid', 400);
  }
}

export const handler = async (event, context, callback) => {
  console.log('Received event:', event);
  // TODO: use async await

  let contactForm;

  return Promise.resolve()
    .then(() => { contactForm = JSON.parse(event.body); })
    .then(() => validateContent(contactForm))
    .then(() => checkGRecaptcha(contactForm['g-recaptcha-response']))
    .then(() => snsPublish(contactForm.name, contactForm.email, contactForm.message))
    .then(() => makeResponse(200))
    .catch(ApiError, (e) => {
      console.log(`ERROR (${e.status}): ${e.message}`);
      return makeResponse(e.status, e.message);
    })
    .then(response => callback(null, response))
    .catch((e) => {
      console.log('ERROR (500): Unhandled exception:', e);
      callback(null, makeResponse(500, 'Internal server error. Please contact me via the e-mail in my resume.'));
    });
};
