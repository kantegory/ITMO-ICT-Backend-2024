"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const controller = new authController_1.default();
router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/refresh', auth_1.checkRefreshToken, controller.refresh);
router.post('/logout', controller.logout);
router.get('/me', auth_1.checkAccessToken, controller.me);
exports.default = router;
