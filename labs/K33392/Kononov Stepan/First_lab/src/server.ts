import 'reflect-metadata';
import app from './app';
import connectDatabase from './database';

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

startServer();
