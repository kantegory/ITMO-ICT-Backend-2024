import { Request, Response } from 'express';
import { BookService } from '../services/BookService';

const bookService = new BookService();

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const getBookById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const book = await bookService.getBookById(id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).send('Book not found');
        }
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

export const createBook = async (req: Request, res: Response) => {
    try {
        const newBook = req.body;
        const book = await bookService.createBook(newBook);
        res.status(201).json(book);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
};

const BookController = { getAllBooks, getBookById, createBook };
export { BookController };
