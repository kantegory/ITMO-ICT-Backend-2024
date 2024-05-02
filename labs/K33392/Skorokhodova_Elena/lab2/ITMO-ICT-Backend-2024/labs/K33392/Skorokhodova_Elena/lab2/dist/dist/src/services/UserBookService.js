"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBookService = void 0;
const UserBook_1 = require("../models/UserBook");
const Book_1 = require("../models/Book");
class UserBookService {
    static addUserBook(userId, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userBook = yield UserBook_1.UserBook.create({ userId, bookId });
            return userBook;
        });
    }
    static deleteUserBook(userBookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedCount = yield UserBook_1.UserBook.destroy({ where: { id: userBookId } });
            return deletedCount > 0;
        });
    }
    static getUserBooks(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBooks = yield UserBook_1.UserBook.findAll({
                    where: { userId },
                    include: [{ model: Book_1.Book, as: 'book' }]
                });
                return userBooks;
            }
            catch (error) {
                throw new Error('Error getting user books: ' + error.message);
            }
        });
    }
}
exports.UserBookService = UserBookService;
