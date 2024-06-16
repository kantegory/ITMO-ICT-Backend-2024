"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserBookController_1 = require("../controllers/UserBookController");
const ExchangeRequestController_1 = require("../controllers/ExchangeRequestController");
const BookController_1 = require("../controllers/BookController");
const router = express_1.default.Router();
exports.userRoutes = router;
router.post("/books", BookController_1.BookController.createBook);
router.get("/available-books", BookController_1.BookController.getAllBooks);
router.post("/user/:userId/book", UserBookController_1.UserBookController.addUserBook);
router.delete("/user/book/:id", UserBookController_1.UserBookController.deleteUserBook);
router.get("/user/:userId/books", UserBookController_1.UserBookController.getUserBooks);
router.post("/exchange/request", ExchangeRequestController_1.ExchangeRequestController.createExchangeRequest);
router.delete("/exchange/:id", ExchangeRequestController_1.ExchangeRequestController.deleteExchangeRequest);
router.get("/exchange/user/:userId", ExchangeRequestController_1.ExchangeRequestController.getUserExchangeRequests); // получение заявок на обмен для конкретного пользователя
