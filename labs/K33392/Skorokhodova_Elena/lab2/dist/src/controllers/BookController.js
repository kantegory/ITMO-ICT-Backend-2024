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
exports.BookController = void 0;
const BookService_1 = require("../services/BookService");
class BookController {
    static createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, author } = req.body;
            try {
                yield BookService_1.BookService.createBook(title, author);
                res.status(201).send('Book created successfully');
            }
            catch (error) {
                console.error('Error creating book:', error);
                res.status(500).send('Error creating book');
            }
        });
    }
    static getAllBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield BookService_1.BookService.getAllBooks();
                res.json(books);
            }
            catch (error) {
                console.error('Error fetching books:', error);
                res.status(500).send('Error fetching books');
            }
        });
    }
}
exports.BookController = BookController;
