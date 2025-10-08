const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require('../config/config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Medical Backend API',
      version: '1.0.0',
      description: 'Auth endpoints for signup/login and profile',
    },
    servers: [{ url: `http://localhost:${config.port}` }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/**/*.js', './src/controllers/**/*.js'],
};

const spec = swaggerJsdoc(options);

function setup(app) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
}

module.exports = setup;


