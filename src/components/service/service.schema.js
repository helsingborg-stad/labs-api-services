const Joi = require('@hapi/joi');
const { id, limit } = require('../../validation/global.schema');

const service_name = Joi.string().min(5).max(50);
const service_path = Joi.string().min(5).max(50);
const service_level = Joi.number().integer().min(0).max(5);
const service_status = Joi.number().integer().min(0).max(500);

// Generic Schema.
const genericSchema = Joi.object().keys({
  service_id: id.required(),
});

const postSchema = Joi.object().keys({
  service_id: id.required(),
  service_name: service_name.required(),
  service_level: service_level.required(),
  service_status: service_status.required(),
  service_path: service_path.required(),
});

const putSchema = Joi.object().keys({ });

const querySchema = Joi.object().keys({
  service_id: id,
  service_name,
  service_level,
  service_status,
  limit,
});

const responseSchema = Joi.object().keys({
  service_id: id.required(),
});

module.exports = {
  genericSchema,
  querySchema,
  putSchema,
  postSchema,
  responseSchema,
};
