"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../../controllers/user/userController"));
const userService_1 = __importDefault(require("../../../services/user/userService"));
const router = express_1.default.Router();
const controller = new userController_1.default(new userService_1.default());
router.route("/singup").post(controller.postCreate);
router.route("/login").post(controller.login);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/delete/:id").delete(controller.deleteById);
router.route("/update/:id").patch(controller.patchUpdateById);
exports.default = router;
