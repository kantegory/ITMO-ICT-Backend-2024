"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cityController_1 = __importDefault(require("../../../controllers/city/cityController"));
const cityService_1 = __importDefault(require("../../../services/city/cityService"));
const ValidateJWT_1 = __importDefault(require("../../../utils/ValidateJWT"));
const router = express_1.default.Router();
const controller = new cityController_1.default(new cityService_1.default());
router.route("/add").post(ValidateJWT_1.default, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/delete/:id").delete(ValidateJWT_1.default, controller.deleteById);
router.route("/update/:id").patch(ValidateJWT_1.default, controller.patchUpdateById);
router.route("/one/by/country/:country_id").get(controller.getFindByCountryId);
exports.default = router;
