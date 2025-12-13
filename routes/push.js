import express from "express";
import PushToken from "../models/PushToken.js";

const router = express.Router();

router.post("/save-token", async (req, res) => {
  const { token } = req.body;

  if (!token) return res.status(400).json({ error: "Missing token" });

  await PushToken.updateOne({ token }, { token }, { upsert: true });

  res.json({ success: true });
});

export default router;
