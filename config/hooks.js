const writeAccessLog = require('./accessLogMiddleware');

module.exports = {
  render: {
    setupMiddleware: async (app) => {
      app.use(writeAccessLog);
    },
  },
  'generate:page': page => {
    page.html = page.html.replace(/ data-n-head=".*?"/gi, '').replace(/ data-hid=".*?"/gi, '')
  },
};
