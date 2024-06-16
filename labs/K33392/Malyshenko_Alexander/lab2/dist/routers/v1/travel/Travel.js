"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travelController_1 = __importDefault(require("../../../controllers/travel/travelController"));
const travelService_1 = __importDefault(require("../../../services/travel/travelService"));
const router = express_1.default.Router();
const controller = new travelController_1.default(new travelService_1.default());
router.route("/add").post(controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/list/by/dep_city/:dep_city_id").get(controller.listFindAllByDepartureCityId);
router.route("/list/by/dep_and_dest_city/:dep_city_id/:dest_city_id").get(controller.listFindAllByDestinationAndDepartureCityId);
router.route("/one/:id").get(controller.getFindById);
router.route("/delete/:id").delete(controller.deleteById);
router.route("/update/:id").patch(controller.patchUpdateById);
exports.default = router;
