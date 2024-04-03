"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../../../controllers/users/User"));
const router = express_1.default.Router();
const controller = new User_1.default();
router.route('/')
    .post(controller.post);
router.route('/profile/:id')
    .get(controller.get);
exports.default = router;
