const cloud = require('@pulumi/cloud-aws');

async function lambda() {
  const endpoint = new cloud.API('website-cz');

  endpoint.get('/contact', (req, res) => {
    const { sendEmail } = require('./contact'); // eslint-disable-line global-require
    sendEmail(req.body, null, (err, data) => {
      if (err) {
        res.status(500);
        return;
      }
      Object.entries(data.headers).forEach((entry) => {
        const [h, v] = entry;
        res.setHeader(h, v);
      });
      res.status(data.statusCode).end(data.body);
    });
  });

  return endpoint.publish().url;
}

exports.lambdaUrl = lambda();
