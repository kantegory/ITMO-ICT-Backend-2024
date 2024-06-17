import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);

createConnection().then(() => {
    app.listen(4000, () => {
        console.log('Auth service is listening on port 4000');
    });
}).catch(error => console.error(error));