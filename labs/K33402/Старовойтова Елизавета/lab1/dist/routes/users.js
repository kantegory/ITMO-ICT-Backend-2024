"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const controller = new userController_1.default();
router.get('/:id', auth_1.checkAccessToken, controller.findById);
router.get('/', auth_1.checkAccessToken, controller.findAll);
router.delete('/:id', auth_1.checkAccessToken, controller.deleteById);
exports.default = router;
