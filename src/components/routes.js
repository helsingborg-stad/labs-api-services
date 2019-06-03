const express = require('express');

const service = require('./service/service.api');

const routes = () => {
  const router = express.Router();

  // Register route to api-layer.
  router.use('/service', service());

  return router;
};


module.exports = routes;
