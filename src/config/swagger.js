import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HowDoILook API',
      version: '1.0.0',
      description: 'API documentation for HowDoILook service'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local Server'
      },
      {
        url: 'https://nb06-howdoilook-team3.onrender.com',
        description: 'Production Server'
      }
    ]
  },
  apis: [path.join(__dirname, '../routers/*.js')]
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
