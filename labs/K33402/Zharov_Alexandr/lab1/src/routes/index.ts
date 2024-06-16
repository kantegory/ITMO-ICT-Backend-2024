import { Router } from "express";
import { UnicornController } from "../controllers";

const router = Router();
const controller = new UnicornController();

router.get("/", controller.getAll);
router.post("/", controller.post);
router.put("/:id", controller.update);

export default router;
