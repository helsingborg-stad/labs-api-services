const { stringWithLimit } = require('../../../swagger/global.swagger');

const servicesSchema = {
  Service: {
    type: 'object',
    properties: {
      id: {
        required: true,
        type: 'integer',
      },
      service_id: {
        required: true,
        ...stringWithLimit(5, 24),
      },
    },
    example: {
      id: 10,
      service_id: 'john_snow',
    },
  },
};

const servicePath = {
  post: {
    tags: ['CRUD operations'],
    description: 'Add a service',
    summary: 'Add Service with Service id and User id',
    operationId: 'addService',
    parameters: [
      {
        in: 'body',
        name: 'body',
        description: 'The service to create.',
        required: true,
        schema: {
          type: 'object',
          properties: {
            service_id: {
              required: true,
              ...stringWithLimit(5, 24),
            },
          },
          example: {
            service_id: 'john_snow',
          },
        },
      },
    ],
    responses: {
      200: {
        description: 'Service created successfully.',
      },
      422: {
        description: 'Validation Error',
        schema: {
          $ref: '#/definitions/ValidationError',
        },
      },
    },
  },
  get: {
    tags: ['CRUD operations'],
    summary: 'Query services',
    description: 'Query services by Service id.',
    operationId: 'queryServices',
    parameters: [
      {
        name: 'service_id',
        in: 'query',
        description: 'The user id of the service',
        type: 'string',
      },
      {
        name: 'limit',
        in: 'query',
        description: 'The number of entities to fetch',
        type: 'integer',
        default: 10,
      },
    ],
    responses: {
      200: {
        description: 'successful operation',
        schema: {
          type: 'array',
          items: {
            $ref: '#/definitions/Service',
          },
        },
      },
      422: {
        description: 'Validation Error',
        schema: {
          $ref: '#/definitions/ValidationError',
        },
      },
    },
  },
};

module.exports = {
  servicePath,
  servicesSchema,
};
