"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transportController_1 = __importDefault(require("../../../controllers/transport/transportController"));
const transportService_1 = __importDefault(require("../../../services/transport/transportService"));
const ValidateJWT_1 = __importDefault(require("../../../utils/ValidateJWT"));
const router = express_1.default.Router();
const controller = new transportController_1.default(new transportService_1.default());
router.route("/add").post(ValidateJWT_1.default, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/list/by/user/:user_id").get(controller.listFindAllByUserId);
router.route("/one/:id").get(controller.getFindById);
router.route("/delete/:id").delete(ValidateJWT_1.default, controller.deleteById);
router.route("/update/:id").patch(ValidateJWT_1.default, controller.patchUpdateById);
exports.default = router;
