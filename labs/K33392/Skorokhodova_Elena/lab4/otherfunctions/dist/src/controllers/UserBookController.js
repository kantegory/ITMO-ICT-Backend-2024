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
exports.UserBookController = void 0;
const UserBookService_1 = require("../services/UserBookService");
const BookService_1 = require("../services/BookService");
class UserBookController {
    static addUserBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const bookId = req.body.bookId;
            try {
                const userBook = yield UserBookService_1.UserBookService.addUserBook(userId, bookId);
                res.status(201).json(userBook);
            }
            catch (error) {
                console.error('Error adding user book:', error);
                res.status(500).send('Error adding user book');
            }
        });
    }
    static deleteUserBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBookId = parseInt(req.params.id);
            try {
                const success = yield UserBookService_1.UserBookService.deleteUserBook(userBookId);
                if (success) {
                    res.status(204).send();
                }
                else {
                    res.status(404).send('User book not found');
                }
            }
            catch (error) {
                console.error('Error deleting user book:', error);
                res.status(500).send('Error deleting user book');
            }
        });
    }
    static getUserBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const userBooks = yield UserBookService_1.UserBookService.getUserBooks(userId);
                const booksWithDetails = yield Promise.all(userBooks.map((userBook) => __awaiter(this, void 0, void 0, function* () {
                    const bookId = userBook.bookId;
                    const book = yield BookService_1.BookService.getBookById(bookId);
                    if (book) {
                        return {
                            id: userBook.id,
                            title: book.title,
                            author: book.author
                        };
                    }
                    else {
                        return null;
                    }
                })));
                const filteredBooks = booksWithDetails.filter(book => book !== null);
                res.json(filteredBooks);
            }
            catch (error) {
                console.error('Error getting user books:', error);
                res.status(500).send('Error getting user books');
            }
        });
    }
}
exports.UserBookController = UserBookController;
