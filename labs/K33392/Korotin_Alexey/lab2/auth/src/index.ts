import express from "express";
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from "./presentation/http";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";


const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 8000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/v1', routes);


const appHost = process.env["app.host"] ?? DEFAULT_HOST;
const appPort = Number(process.env["app.port"]) ?? DEFAULT_PORT;

const swaggerOptions: swaggerJsDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Account API',
            description: "User account API for Smart Device App",
            version: '1.0.0-BETA',
            contact: {
                name: "Alexey Korotin K33392"
            }
        },
        externalDocs: {
            description: "swagger.json",
            url: '/swagger.json'
        },
        servers: [
            {
                url: `http://${appHost}:${appPort}/v1`
            }
        ]

    },
    apis: ['**/presentation/http/*/*.ts']
};

const docs = swaggerJsDoc(swaggerOptions);

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(docs));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(docs);
});

app.listen(appPort, appHost, () => console.log(`Application have started listening ${appHost} at port ${appPort}`));