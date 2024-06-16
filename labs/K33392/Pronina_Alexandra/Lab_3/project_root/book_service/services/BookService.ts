import { Book } from '../models/Book';

export class BookService {
    async getAllBooks() {
        return await Book.findAll();
    }

    async getBookById(id: number) {
        return await Book.findByPk(id);
    }

    async createBook(book: Partial<Book>) {
        return await Book.create(book);
    }
}
