const { servicePath, servicesSchema } = require('../src/components/service/service.swagger');
const { definitions } = require('../swagger/global.swagger');

module.exports = {
  swagger: '2.0',
  info: {
    version: '0.0.1',
    title: 'Simple API',
    description: 'Api document to test and document all available API functionality',
  },
  host: 'simple.api',
  paths: {
    '/service': {
      post: servicePath.post,
      get: servicePath.get,
    },
  },
  definitions: {
    ...definitions,
    ...servicesSchema,
  },
};
