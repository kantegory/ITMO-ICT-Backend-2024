import express from 'express';
import UserProfileController from "../controllers/userProfileController";
import {checkAccessToken} from "../middleware/auth";

const router = express.Router();
const controller = new UserProfileController()

router.get('/my', checkAccessToken, controller.my)
router.put('/my', checkAccessToken, controller.updateMy)

export default router
