import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Trash2, Loader2, Plus } from "lucide-react";

import { useGlobal } from "../context/GlobalContext";

function MyChats() {
  const { getChats, getChat, createNewChat, clearCurrentChat } = useGlobal();

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadChats = async () => {
      setLoading(true);
      const data = await getChats();
      setChats(data || []);
      setLoading(false);
    };

    loadChats();
  }, []);

  const handleOpenChat = async (chatId) => {
    await getChat(chatId);
    navigate("/assistant");
  };

  const handleNewChat = async () => {
    clearCurrentChat();
    await createNewChat();
    navigate("/assistant");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPreview = (chat) => {
    const lastMessage = chat.messages?.[chat.messages.length - 1];
    return lastMessage?.content?.slice(0, 80) || "No messages yet";
  };

  return (
    <div className="min-h-screen bg-slate-50 px-8 py-7 dark:bg-slate-950">

      <div className="mx-auto max-w-[900px]">

        {/* Header */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-[22px] font-bold text-slate-800 dark:text-slate-100">
              My Chats
            </h1>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              All your previous conversations with the BIS AI Assistant
            </p>
          </div>

          <button
            onClick={handleNewChat}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Plus size={15} />
            New Chat
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <div className="flex items-center justify-center py-24 text-slate-400 dark:text-slate-500">
            <Loader2 size={20} className="animate-spin" />
            <span className="ml-2 text-xs">Loading your chats...</span>
          </div>
        )}

        {/* Empty state */}

        {!loading && chats.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-24 text-center dark:border-slate-800 dark:bg-slate-900">
            <MessageSquare size={34} className="mb-3 text-slate-300 dark:text-slate-600" />
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              No chats yet
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Start a new conversation to see it here
            </p>
          </div>
        )}

        {/* Chat list */}

        {!loading && chats.length > 0 && (
          <div className="space-y-3">

            {chats.map((chat) => (
              <button
                key={chat._id}
                onClick={() => handleOpenChat(chat._id)}
                className="flex w-full items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <MessageSquare size={17} />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center justify-between gap-3">
                    <h3 className="truncate text-[13px] font-bold text-slate-800 dark:text-slate-100">
                      {chat.title || "New Chat"}
                    </h3>

                    <span className="shrink-0 text-[9px] text-slate-400 dark:text-slate-500">
                      {formatDate(chat.updatedAt)}
                    </span>
                  </div>

                  <p className="mt-1 truncate text-[11px] text-slate-500 dark:text-slate-400">
                    {getPreview(chat)}
                  </p>

                  <p className="mt-1 text-[9px] text-slate-400 dark:text-slate-500">
                    {chat.messages?.length || 0} messages
                  </p>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyChats;