import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(bodyParser.json());

app.use('/auth', authRoutes);

createConnection().then(() => {
    app.listen(3001, () => {
        console.log('Auth service is listening on port 3001');
    });
}).catch(error => console.log(error));