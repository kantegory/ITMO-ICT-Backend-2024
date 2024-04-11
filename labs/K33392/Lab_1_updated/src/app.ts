import express from 'express';
import { userRoutes } from '../src/routes/UserRoutes';
import { SQLRepo } from './config/database'; // Путь к классу SQLRepo

new SQLRepo();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
