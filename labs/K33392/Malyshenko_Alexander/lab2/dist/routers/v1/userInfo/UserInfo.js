"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userInfoController_1 = __importDefault(require("../../../controllers/userInfo/userInfoController"));
const userInfoService_1 = __importDefault(require("../../../services/userInfo/userInfoService"));
const router = express_1.default.Router();
const controller = new userInfoController_1.default(new userInfoService_1.default());
router.route("/add").post(controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/one/by/user/:user_id").get(controller.getFindByUserId);
router.route("/delete/:id").delete(controller.deleteById);
router.route("/update/:id").patch(controller.patchUpdateById);
exports.default = router;
