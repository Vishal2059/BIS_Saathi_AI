import express from "express";

import {
  createChat,
  addMessage,
  getChats,
  getChat,
  deleteChat,
} from "../controllers/chatController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create new chat
router.post("/create", protect, createChat);

// Add message to existing chat
router.post("/:id/message", protect, addMessage);

// Get all chats
router.get("/", protect, getChats);

// Get single chat
router.get("/:id", protect, getChat);

router.delete("/:id", protect, deleteChat);

export default router;