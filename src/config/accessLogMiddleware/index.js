const onFinished = require('on-finished');

module.exports = function writeAccessLog({ url, method }, response, next) {
  onFinished(response, (err, { statusCode, statusMessage }) => {
    console.log(`${new Date().toISOString()} - Request URL: ${url} Method: ${method} Status: ${statusCode} - ${statusMessage} `);
  });

  next();
};
