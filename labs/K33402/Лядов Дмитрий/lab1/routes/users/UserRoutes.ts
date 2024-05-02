import express, { Request, Response } from "express";
import UserController from "../../controllers/users/UserController";

const router: express.Router = express.Router();

const controller: UserController = new UserController();

router.get("/me", controller.me);
router.get("/:id", (req: Request, res: Response) => {
  controller.findById(req.params.id, res);
});
router
  .route("/")
  .get(controller.get)
  .patch(controller.patch)
  .delete(controller.delete);
router.route("/password").patch(controller.changePassword);

export default router;
