import swaggerJsDoc from 'swagger-jsdoc';
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
      description: 'HowDoILook 프로젝트의 API 문서입니다.'
    },
    servers: [{ url: 'http://localhost:3000' }]
  },
  apis: [path.join(__dirname, '../routers/*.js')]
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec, swaggerUi };
