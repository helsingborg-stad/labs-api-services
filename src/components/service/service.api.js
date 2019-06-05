const express = require('express');
const Services = require('./service.db');
const { postSchema, querySchema, getSchema } = require('./service.schema');
const Validator = require('../..//middlewares/validator.middleware');
const logger = require('../../utils/logger');

const routes = () => {
  const router = express.Router();

  router.get('/', Validator(querySchema, 'query', true), async (req, res) => {
    try {
      const { query } = req;
      const result = await Services.query(query);

      return res.json(result);
    } catch (err) {
      logger.error(err.message);
      // Send back error in json.
      return res.status(err.status || 500).json(err);
    }
  });

  router.post('/report', Validator(postSchema, 'body', true), async (req, res) => {
    try {
      const { body } = req;
      await Services.report(body);

      return res.send('Service reported successfully.');
    } catch (err) {
      logger.error(err.message);
      return res.status(err.status || 500).json(err);
    }
  });

  router.delete('/:service_id', Validator(getSchema, 'params', true), async (req, res) => {
    try {
      const { service_id } = req.params;
      await Services.remove(service_id);

      return res.send('Service removed successfully.');
    } catch (err) {
      logger.error(err.message);
      return res.status(err.status || 500).json(err);
    }
  });

  return router;
};

module.exports = routes;
