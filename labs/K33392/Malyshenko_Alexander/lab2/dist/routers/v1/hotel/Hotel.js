"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotelController_1 = __importDefault(require("../../../controllers/hotel/hotelController"));
const hotelService_1 = __importDefault(require("../../../services/hotel/hotelService"));
const ValidateJWT_1 = __importDefault(require("../../../utils/ValidateJWT"));
const router = express_1.default.Router();
const controller = new hotelController_1.default(new hotelService_1.default());
router.route("/add").post(ValidateJWT_1.default, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/list/by/city/:city_id").get(controller.listFindAllByCityId);
router.route("/one/:id").get(controller.getFindById);
router.route("/delete/:id").delete(ValidateJWT_1.default, controller.deleteById);
router.route("/update/:id").patch(ValidateJWT_1.default, controller.patchUpdateById);
exports.default = router;
