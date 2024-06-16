"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travelUserLinkController_1 = __importDefault(require("../../../controllers/link/travelUserLink/travelUserLinkController"));
const travelUserLinkService_1 = __importDefault(require("../../../services/links/travelUserLink/travelUserLinkService"));
const ValidateJWT_1 = __importDefault(require("../../../utils/ValidateJWT"));
const router = express_1.default.Router();
const controller = new travelUserLinkController_1.default(new travelUserLinkService_1.default());
router.route("/add").post(ValidateJWT_1.default, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/one/by/user/:user_id").get(controller.getFindByUserId);
router.route("/one/by/travel/:travel_id").get(controller.getFindByTravelId);
router.route("/delete/:id").delete(ValidateJWT_1.default, controller.deleteById);
router.route("/update/:id").patch(ValidateJWT_1.default, controller.patchUpdateById);
exports.default = router;
