import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import process from "process";

export const authUsersMiddlware = async (
  req: Request,
  res: Response,
  next: any
) => {
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
    const resp = await fetch(`${process.env.AUTH_SERVICE}/token/verify`, {
      method: "POST",
      body: JSON.stringify({ token: token }),
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) {
      res.sendStatus(401);
      return;
    }
    next();
  } catch (e) {
    res.sendStatus(401);
  }
};
