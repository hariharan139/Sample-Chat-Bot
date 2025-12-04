import express from "express";
import { Message } from "../controllers/botgpt.msg.js";
const router = express.Router();

router.post("/message", Message);

export default router;
