import express from "express";
import { UserController } from "../controllers/UserController";
import { UserBookController } from "../controllers/UserBookController";
import { ExchangeRequestController } from "../controllers/ExchangeRequestController";
import { ProfileController } from "../controllers/ProfileController";
import { AuthController } from "../controllers/AuthController";
import { BookController } from '../controllers/BookController';

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);


router.post('/users/:userId/profile', ProfileController.createOrUpdateProfile); 
router.get('/users/:userId/getprofile', ProfileController.getProfileByUserId); 


router.post("/users", UserController.createUser); 
router.get("/users/:id", UserController.getUserById); 
router.delete("/users/:id", UserController.deleteUser); 

router.post('/books', BookController.createBook); 
router.get('/available-books', BookController.getAllBooks); 

router.post("/user/:userId/book", UserBookController.addUserBook); 
router.delete("/user/book/:id", UserBookController.deleteUserBook); 
router.get("/user/:userId/books", UserBookController.getUserBooks); 

router.post("/exchange/request",ExchangeRequestController.createExchangeRequest);
router.delete("/exchange/:id",ExchangeRequestController.deleteExchangeRequest); 
router.get('/exchange/user/:userId', ExchangeRequestController.getUserExchangeRequests); // получение заявок на обмен для конкретного пользователя
router.patch('/exchange/:id/confirm', ExchangeRequestController.confirmExchangeRequest);


export { router as userRoutes };
