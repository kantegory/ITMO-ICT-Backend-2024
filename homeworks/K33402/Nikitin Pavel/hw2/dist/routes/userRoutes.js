"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.router = router;
router.post("/", controllers_1.UserController.createUser);
router.get("/", controllers_1.UserController.getAllUsers);
router.get("/:id", controllers_1.UserController.getUserById);
router.get("/email/:email", controllers_1.UserController.getUserByEmail);
router.put("/:id", controllers_1.UserController.updateUser);
router.delete("/:id", controllers_1.UserController.deleteUser);
