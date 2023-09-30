const swaggerAutogen = require('swagger-autogen')();
//const routes = require('./src/routes/index')

const doc = {
  info: {
    version: '',      // by default: '1.0.0'
    title: 'taskatorApi',        // by default: 'REST API'
    description: `Taskater is a task management designed to ease the management of daily tasks and duties.`,  // by default: ''
  },
  host: 'tasketor.onrender.com/',      // by default: 'localhost:3000'
  basePath: '',  // by default: '/'
  schemes: ['https'],   // by default: ['http']
  consumes: [],  // by default: ['application/json']
  produces: [],  // by default: ['application/json']
  tags: [        // by default: empty Array
    {
      name: '',         // Tag name
      description: '',  // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {},  // by default: empty object
  definitions: {},          // by default: empty object (Swagger 2.0)
  components: {}            // by default: empty object (OpenAPI 3.x)
};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./src/routes/index'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);