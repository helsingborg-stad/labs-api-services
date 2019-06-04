const { stringWithLimit, integerWithLimit, date } = require('../../../swagger/global.swagger');

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
      service_name: {
        required: true,
        ...stringWithLimit(5, 50),
      },
      service_path: {
        required: true,
        ...stringWithLimit(5, 500),
      },
      service_level: {
        required: true,
        ...integerWithLimit(0, 5),
      },
      service_status: {
        required: true,
        ...integerWithLimit(0, 500),
      },
      updated_at: {
        required: true,
        ...date(),
      },
    },
    example: {
      id: 10,
      service_id: 'iron_bank',
      service_name: 'Iron Bank',
      service_level: 2,
      service_status: 200,
      service_path: 'https://iron-bank:123'
    },
  },
};

const servicePath = {
  post: {
    tags: ['Service'],
    description: 'Add a service',
    summary: 'Add or update a service',
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
            service_name: {
              required: true,
              ...stringWithLimit(5, 50),
            },
            service_path: {
              required: true,
              ...stringWithLimit(5, 500),
            },
            service_level: {
              required: true,
              ...integerWithLimit(0, 5),
            },
            service_status: {
              required: true,
              ...integerWithLimit(0, 500),
            },
            updated_at: {
              required: true,
              ...date(),
            },
          },
          example: {
            service_id: 'iron_bank',
            service_name: 'Iron Bank',
            service_level: 2,
            service_status: 200,
            service_path: 'https://iron-bank:123'
          },
        },
      },
    ],
    responses: {
      200: {
        description: 'Service reported successfully.',
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
    tags: ['Service'],
    summary: 'Query services',
    description: 'Query services by Service id.',
    operationId: 'queryServices',
    parameters: [
      {
        name: 'service_id',
        in: 'query',
        description: 'The id of the service',
        type: 'string',
      },
      {
        name: 'service_name',
        in: 'query',
        description: 'The name of the service',
        type: 'string',
      },
      {
        name: 'service_level',
        in: 'query',
        description: 'The level of the service',
        type: 'integer',
      },
      {
        name: 'service_status',
        in: 'query',
        description: 'The status of the service',
        type: 'integer',
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
        description: 'Query Successfull',
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
