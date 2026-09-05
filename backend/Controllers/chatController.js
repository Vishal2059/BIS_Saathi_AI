import Chat from "../models/Chat.js";
import { getGeminiResponse } from "../utils/geminiService.js";

// Create new chat
export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      user: req.user._id,
      title: "New Chat",
      messages: [],
    });

    res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add message to chat (ab Gemini bhi call karega)
export const addMessage = async (req, res) => {
  try {
    const { role, content, sources } = req.body;

    if (!role || !content) {
      return res.status(400).json({
        success: false,
        message: "Role and content are required",
      });
    }

    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // User ka message save karo
    chat.messages.push({
      role,
      content,
      sources: sources || [],
    });

    // First user message becomes chat title
    if (role === "user" && chat.title === "New Chat") {
      chat.title = content.slice(0, 40);
    }

    // Agar ye user ka message tha, to Gemini se reply lo aur usi request me save karo
    if (role === "user") {
      const geminiResult = await getGeminiResponse(content, chat.messages);

      chat.messages.push({
        role: "assistant",
        content: geminiResult.text,
        sources: [],
      });
    }

    await chat.save();

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all chats of logged-in user
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user._id,
    }).sort({ updatedAt: -1 });

    res.json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single chat
export const getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a chat
export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      message: "Chat deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};