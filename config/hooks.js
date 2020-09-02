const writeAccessLog = require('./accessLogMiddleware');

module.exports = {
  render: {
    setupMiddleware: async (app) => {
      app.use(writeAccessLog);
    },
  },
};
