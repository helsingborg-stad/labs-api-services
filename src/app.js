const express = require('express');
const config = require('config');
const pino = require('express-pino-logger');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const swaggerDocument = require('../swagger/swagger.js');
const routes = require('./components/routes');
const logger = require('./utils/logger');

const app = express();

/**
 * Config
 */
const SERVER_PORT = process.env.PORT || config.get('SERVER.PORT');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Request logging
app.use(pino({ logger }));

// Add routes to the app.
app.get('/', (req, res) => res.send('Service API - Keeps track of other services and maintains cron-jobs.'));
app.use(routes());

// Swagger for documenting the api, access through localhost:xxxx/api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Start
 */

// Listen on port specfied in env-file.
const server = app.listen(SERVER_PORT,
  () => logger.info(`Service app listening on port ${SERVER_PORT}!`));

// Export server to use it in tests.
module.exports = server;
