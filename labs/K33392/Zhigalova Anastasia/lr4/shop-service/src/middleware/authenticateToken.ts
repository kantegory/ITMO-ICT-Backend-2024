import dotenv from "dotenv";
import process from "process";
import { Request, Response } from "express";

dotenv.config();

const authenticateToken = async (req: Request, res: Response, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader === undefined) return res.sendStatus(401);
  if (!authHeader.startsWith("Bearer")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  const resp = await fetch(`${process.env.AUTH_SERVICE_URL}/users/verify`, {
    body: JSON.stringify({ token: token }),
    headers: { "content-type": "application/json" },
    method: "POST",
  });
  if (!resp.ok) return res.sendStatus(401);
  next();
};

export default authenticateToken;
