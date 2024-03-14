import express, { Request, Response, Router } from "express";
import { Op } from "sequelize";
import { User, UserAttributes } from "../models/User";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const user = await User.create({ email, name } as UserAttributes);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

router.get("/:idOrEmail", async (req: Request, res: Response) => {
  const { idOrEmail } = req.params;
  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ id: idOrEmail }, { email: idOrEmail }],
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      const { email, name } = req.body;
      await user.update({ email, name });
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
