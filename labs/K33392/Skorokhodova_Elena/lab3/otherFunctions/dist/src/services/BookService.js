"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const Book_1 = require("../models/Book");
class BookService {
    static createBook(title, author) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield Book_1.Book.create({ title, author });
                console.log('Book created:', book.toJSON());
            }
            catch (error) {
                console.error('Error creating book:', error);
                throw error;
            }
        });
    }
    static getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield Book_1.Book.findAll();
                return books;
            }
            catch (error) {
                console.error('Error fetching books:', error);
                throw new Error('Error fetching books');
            }
        });
    }
    static addBook(title, author) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield Book_1.Book.create({ title, author });
            return book;
        });
    }
    static deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield Book_1.Book.destroy({ where: { id } });
            return deletedCount > 0;
        });
    }
    static getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const book = yield Book_1.Book.findByPk(id);
                return book;
            }
            catch (error) {
                console.error('Error fetching book by id:', error);
                throw new Error('Error fetching book by id');
            }
        });
    }
}
exports.BookService = BookService;
