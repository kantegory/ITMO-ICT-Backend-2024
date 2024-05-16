"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/users/userController");
const router = express_1.default.Router();
const userController = new userController_1.UserController();
router.post("/register", (req, res) => {
    userController.register(req, res);
});
router.post("/login", (req, res) => {
    userController.login(req, res);
});
router.get("/:id", (req, res) => {
    userController.getUserWithOrders(req, res);
});
router.post("/verify", userController.verify);
exports.default = router;
