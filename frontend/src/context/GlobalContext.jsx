import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import translations from "../translations/translations.js";

const GlobalContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export const GlobalContextProvider = ({ children }) => {
  // =====================================================
  // LANGUAGE / TRANSLATION
  // =====================================================

  const [language, setLanguage] = useState("English");

  const t = (key) => {
    return (
      translations[language]?.[key] ||
      translations.English?.[key] ||
      key
    );
  };

    // =====================================================
  // THEME (DARK / LIGHT)
  // =====================================================

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // =====================================================
  // AUTH STATES
  // =====================================================

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const [authModal, setAuthModal] = useState({
    open: false,
    view: "login",
  });

  // =====================================================
  // AUTH MODAL
  // =====================================================

  const openAuthModal = (view = "login") => {
    setAuthError("");

    setAuthModal({
      open: true,
      view,
    });
  };

  const closeAuthModal = () => {
    setAuthError("");

    setAuthModal((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const switchAuthView = (view) => {
    setAuthError("");

    setAuthModal((prev) => ({
      ...prev,
      view,
    }));
  };

  // =====================================================
  // CHECK LOGIN ON PAGE LOAD
  // =====================================================

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuthenticated(false);
        setUser(null);
        setAuthLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log("=================================");
        console.log("AUTH ME RESPONSE:", data);
        console.log("=================================");

        if (response.ok && data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");

          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Auth check error:", error);

        localStorage.removeItem("token");

        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async ({ email, password }) => {
    try {
      setAuthError("");

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("=================================");
      console.log("LOGIN RESPONSE:", data);
      console.log("=================================");

      if (!response.ok || !data.success) {
        setAuthError(
          data.message || "Invalid email or password"
        );

        return {
          success: false,
          message: data.message,
        };
      }

      // Save JWT
      localStorage.setItem("token", data.token);

      // Save user
      setUser(data.user);
      setIsAuthenticated(true);

      // Close modal
      closeAuthModal();

      return {
        success: true,
      };
    } catch (error) {
      console.error("Login error:", error);

      setAuthError(
        "Unable to connect to server. Please try again."
      );

      return {
        success: false,
        message: error.message,
      };
    }
  };

  // =====================================================
  // SIGNUP
  // =====================================================

  const signup = async ({ name, email, password }) => {
    try {
      setAuthError("");

      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("=================================");
      console.log("SIGNUP RESPONSE:", data);
      console.log("=================================");

      if (!response.ok || !data.success) {
        setAuthError(
          data.message || "Unable to create account"
        );

        return {
          success: false,
          message: data.message,
        };
      }

      // Save JWT
      localStorage.setItem("token", data.token);

      // Save user
      setUser(data.user);
      setIsAuthenticated(true);

      // Close modal
      closeAuthModal();

      return {
        success: true,
      };
    } catch (error) {
      console.error("Signup error:", error);

      setAuthError(
        "Unable to connect to server. Please try again."
      );

      return {
        success: false,
        message: error.message,
      };
    }
  };

  // =====================================================
  // CHAT STATES
  // =====================================================

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const [currentChatId, setCurrentChatId] = useState(null);

  const [chatLoading, setChatLoading] = useState(false);

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setIsAuthenticated(false);
    setAuthError("");

    // Clear current chat
    setMessages([]);
    setCurrentChatId(null);
    setInput("");
  };

  // =====================================================
  // CREATE NEW CHAT
  // =====================================================

  const createNewChat = async () => {
    const token = localStorage.getItem("token");

    console.log("=================================");
    console.log("CREATE CHAT");
    console.log("TOKEN EXISTS:", !!token);
    console.log("=================================");

    if (!token) {
      openAuthModal("login");
      return null;
    }

    try {
      setChatLoading(true);

      const response = await fetch(`${API_URL}/chat/create`, {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("CREATE CHAT STATUS:", response.status);
      console.log("CREATE CHAT RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to create chat"
        );
      }

      setCurrentChatId(data.chat._id);

      setMessages([]);

      console.log("NEW CHAT ID:", data.chat._id);

      return data.chat;
    } catch (error) {
      console.error("Create chat error:", error);

      return null;
    } finally {
      setChatLoading(false);
    }
  };

  // =====================================================
  // SEND MESSAGE (ab Gemini backend-side call karta hai)
  // =====================================================

  const sendMessage = async () => {
    if (!input.trim() || chatLoading) {
      console.log("Send cancelled: empty input/loading");
      return;
    }

    const token = localStorage.getItem("token");

    console.log("=================================");
    console.log("SEND MESSAGE START");
    console.log("TOKEN EXISTS:", !!token);
    console.log("INPUT:", input);
    console.log("CURRENT CHAT ID:", currentChatId);
    console.log("=================================");

    if (!token) {
      console.log("No token found. Opening login.");
      openAuthModal("login");
      return;
    }

    try {
      setChatLoading(true);

      // =================================================
      // CHAT ID
      // =================================================

      let chatId = currentChatId;

      // =================================================
      // CREATE CHAT IF CHAT DOES NOT EXIST
      // =================================================

      if (!chatId) {
        console.log("No current chat. Creating new chat...");

        const chatResponse = await fetch(
          `${API_URL}/chat/create`,
          {
            method: "POST",

            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const chatData = await chatResponse.json();

        console.log("CREATE CHAT STATUS:", chatResponse.status);
        console.log("CREATE CHAT DATA:", chatData);

        if (!chatResponse.ok || !chatData.success) {
          throw new Error(
            chatData.message || "Unable to create chat"
          );
        }

        chatId = chatData.chat._id;

        setCurrentChatId(chatId);

        console.log("CHAT CREATED SUCCESSFULLY:", chatId);
      }

      // =================================================
      // GET USER INPUT
      // =================================================

      const userMessage = input.trim();

      console.log("USER MESSAGE:", userMessage);
      console.log("CHAT ID:", chatId);

      // Clear input
      setInput("");

      // =================================================
      // SHOW USER MESSAGE IN UI (turant, backend response ka wait kiye bina)
      // =================================================

      const userMessageUI = {
        id: Date.now(),
        type: "user",
        text: userMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, userMessageUI]);

      // =================================================
      // SEND TO BACKEND
      // Backend hi Gemini se reply lekar user + AI dono
      // messages ek hi request me MongoDB me save karta hai
      // =================================================

      console.log("Sending message to backend (Gemini will reply)...");

      const response = await fetch(
        `${API_URL}/chat/${chatId}/message`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            role: "user",
            content: userMessage,
          }),
        }
      );

      const data = await response.json();

      console.log("=================================");
      console.log("MESSAGE API STATUS:", response.status);
      console.log("MESSAGE API RESPONSE:", data);
      console.log("CHAT ID:", chatId);
      console.log("=================================");

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to send message"
        );
      }

      console.log("✅ MESSAGE SAVED (USER + AI)");

      // =================================================
      // AI KA REPLY BACKEND SE MILA - UI ME DIKHAO
      // (backend ne chat.messages array me last me
      //  assistant ka reply push kiya hai)
      // =================================================

      const lastMessage = data.chat.messages[data.chat.messages.length - 1];

      const aiMessageUI = {
        id: lastMessage._id,
        type: "bot",
        text: lastMessage.content,
        sources: lastMessage.sources || [],
        time: new Date(lastMessage.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMessageUI]);

      console.log("✅ SEND MESSAGE COMPLETED");

    } catch (error) {
      console.error("❌ SEND MESSAGE ERROR:", error);
      console.error("ERROR MESSAGE:", error.message);
    } finally {
      setChatLoading(false);
    }
  };

  // =====================================================
  // GET ALL CHATS
  // =====================================================

  const getChats = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return [];
    }

    try {
      const response = await fetch(
        `${API_URL}/chat/`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("GET CHATS RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch chats"
        );
      }

      return data.chats;

    } catch (error) {
      console.error("Get chats error:", error);

      return [];
    }
  };

  // =====================================================
  // GET SINGLE CHAT
  // =====================================================

  const getChat = async (chatId) => {
    const token = localStorage.getItem("token");

    if (!token || !chatId) {
      return null;
    }

    try {
      setChatLoading(true);

      const response = await fetch(
        `${API_URL}/chat/${chatId}`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("GET SINGLE CHAT RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to fetch chat"
        );
      }

      // Save current chat ID
      setCurrentChatId(data.chat._id);

      // Convert backend messages
      const formattedMessages =
        data.chat.messages.map(
          (message) => ({
            id: message._id,
            type: message.role === "user" ? "user" : "bot",
            text: message.content,
            sources: message.sources || [],
            time: new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          })
        );

      setMessages(formattedMessages);

      return data.chat;

    } catch (error) {
      console.error("Get chat error:", error);

      return null;

    } finally {
      setChatLoading(false);
    }
  };

  // =====================================================
  // CLEAR CURRENT CHAT
  // =====================================================

  const clearCurrentChat = () => {
    setMessages([]);
    setCurrentChatId(null);
    setInput("");
  };

    // =====================================================
  // DELETE CHAT
  // =====================================================

  const deleteChat = async (chatId) => {
    const token = localStorage.getItem("token");

    if (!token || !chatId) {
      return { success: false };
    }

    try {
      const response = await fetch(`${API_URL}/chat/${chatId}`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("DELETE CHAT RESPONSE:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to delete chat");
      }

      // Agar deleted chat hi currently open thi, to clear kar do
      if (currentChatId === chatId) {
        clearCurrentChat();
      }

      return { success: true };
    } catch (error) {
      console.error("Delete chat error:", error);
      return { success: false, message: error.message };
    }
  };

  // =====================================================
  // PROVIDER
  // =====================================================

  return (
    <GlobalContext.Provider
      value={{
        // LANGUAGE
        language,
        setLanguage,
        t,

        // AUTH
        user,
        setUser,
        isAuthenticated,
        authLoading,
        authError,

        authModal,
        openAuthModal,
        closeAuthModal,
        switchAuthView,

        login,
        signup,
        logout,

        // CHAT
        messages,
        setMessages,

        input,
        setInput,

        currentChatId,
        setCurrentChatId,

        chatLoading,

        createNewChat,
        sendMessage,

        getChats,
        getChat,

        deleteChat,

        clearCurrentChat,

        theme,
        toggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useGlobal = () => {
  return useContext(GlobalContext);
};