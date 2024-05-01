const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routers/users/index.ts'];
swaggerAutogen(outputFile, endpointsFiles);
export {};
//# sourceMappingURL=swagger.js.map