import type { Request, Response } from "express";
import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: "unAuthorized" });
    }

    const { email, name, imageUrl } = req.body;

    if (!email || !name || !imageUrl) {
      return res.status(400).json({
        error: "All fields Required",
      });
    }

    const user = await queries.upsertUser({
      id: userId,
      name,
      email,
      imageUrl,
    });
    
    res.status(201).json(user);

  } catch (error) {
    console.error("Error synccing user", error);
    res.status(500).json({
      error: "failed to sync the user"  
    });
  }
}
