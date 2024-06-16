import express from 'express';
import UserProfileController from "../controllers/userProfileController";
import { checkAuth } from "../middleware/auth";


const router = express.Router();
const controller = new UserProfileController()

router.get('/my', checkAuth, controller.my)
router.put('/my', checkAuth, controller.updateMy)

export default router
