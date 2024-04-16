"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
exports.userRoutes = router;
router.post('/users', UserController_1.UserController.createUser);
router.get('/users/:id', UserController_1.UserController.getUserById);
router.delete('/users/:id', UserController_1.UserController.deleteUser);
