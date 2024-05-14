import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import process from "process";

export const authUsersMiddlware = (req: Request, res: Response, next: any) => {
  try {
    if (
      (req.path === "/users" && req.method === "POST") ||
      req.path === "/login" ||
      req.path === "/register"
    )
      return next();
    if (!req.headers.authorization)
      return res.status(403).json({ message: "Unauthorized" });
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    next();
  } catch (e) {
    res.sendStatus(401);
  }
};
