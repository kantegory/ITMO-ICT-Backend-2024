import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from "./presentation/http";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/v1', routes);


const appHost = process.env["app.host"] ?? DEFAULT_HOST;
const appPort = Number(process.env["app.port"]) ?? DEFAULT_PORT;

const swaggerOptions: swaggerJsDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'Smart devices API',
            description: "Main API for Smart Device App",
            version: '1.0.0-BETA',
            contact: {
                name: "Alexey Korotin K33392"
            },
        },
        schemes: ['http'],
        servers: [
            {
                url: `http://${appHost}:${appPort}`
            }
        ],
        basePath: '/v1',
        components: {
            securitySchemes: {
                bearer: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    in: 'header',
                    name: 'Authorization',
                    description: 'JWT authorization of an API',
                }
            }
        },
        security: [{
            bearer: []
        }]
    },
    apis: ['**/presentation/http/*/*.ts'],
};

const docs = swaggerJsDoc(swaggerOptions);

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(docs));

app.listen(appPort, appHost, () => console.log(`Application have started listening ${appHost} at port ${appPort}`));
