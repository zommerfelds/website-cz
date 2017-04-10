const testInput = require('./test-input');

process.env.AWS_REGION = 'us-east-1';
process.env.CF_WebsiteChristianContact = 'arn:aws:sns:us-east-1:168146358807:website-cz-dev-WebsiteChristianContact-1I6D7CHJUKNXR'; // TODO: this could change
process.env.CORS_ORIGIN = '*';
const contactHandler = require('./contact').sendEmail;

console.log('testInput:', testInput);

function callback(...args) {
  console.log('callback:', args);
}
contactHandler(testInput, {}, callback);
