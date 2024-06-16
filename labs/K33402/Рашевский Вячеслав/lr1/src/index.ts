import express from 'express';
import cardsRouter from './routes/subscription/index.js';
import sequelize from './providers/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/subscription', cardsRouter);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
        app.listen(process.env.PORT);
        console.log(`Server is listening on port ${process.env.PORT}`);
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
}

startServer();
