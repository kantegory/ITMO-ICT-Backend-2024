"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const placeCommentController_1 = __importDefault(require("../../../../controllers/comment/placeComment/placeCommentController"));
const placeCommentService_1 = __importDefault(require("../../../../services/comment/placeComment/placeCommentService"));
const ValidateJWT_1 = __importDefault(require("../../../../utils/ValidateJWT"));
const router = express_1.default.Router();
const controller = new placeCommentController_1.default(new placeCommentService_1.default());
router.route("/add").post(ValidateJWT_1.default, controller.postCreate);
router.route("/list").get(controller.listFindAll);
router.route("/one/:id").get(controller.getFindById);
router.route("/one/by/place/:place_id").get(controller.getFindByPlaceId);
router.route("/delete/:id").delete(ValidateJWT_1.default, controller.deleteById);
router.route("/update/:id").patch(ValidateJWT_1.default, controller.patchUpdateById);
exports.default = router;
