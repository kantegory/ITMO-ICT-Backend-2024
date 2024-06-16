import express from 'express';
import { BookController } from './controllers/BookController';
import { sequelize } from './models';
import { authMiddleware } from './middleware/authMiddleware';
import { RabbitMQService } from './services/RabbitMQService';

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/books',authMiddleware, BookController.getAllBooks);
app.get('/books/:id',authMiddleware, BookController.getBookById);
app.post('/books', authMiddleware, BookController.createBook);

sequelize.sync().then(() => {
    RabbitMQService.connect();
    app.listen(PORT, () => {
        console.log(`Book service running on port ${PORT}`);
    });
});
