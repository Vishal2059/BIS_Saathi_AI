import {
  Bot,
  User,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Paperclip,
  Send,
  ChevronDown,
  Loader2,
  MessageSquare,
} from "lucide-react";

import { useGlobal } from "../context/GlobalContext";

function ChatArea() {
  const {
    messages,
    input,
    setInput,
    sendMessage,
    chatLoading,
  } = useGlobal();

  const handleSuggestionClick = (question) => {
    setInput(question);
  };

  return (
    <section className="flex h-full min-h-0 min-w-0 flex-1 flex-col">

      {/* ================= MESSAGES ================= */}
      <div className="min-h-0 flex-1 overflow-y-auto px-8 py-7">

        <div className="mx-auto max-w-[700px]">

          {messages.length === 0 && !chatLoading && (
            <div className="flex flex-col items-center justify-center py-24 text-center text-slate-400 dark:text-slate-500">
              <MessageSquare
                size={34}
                className="mb-3 text-slate-300 dark:text-slate-600"
              />

              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                No conversation yet
              </p>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Type your question below to get started
              </p>
            </div>
          )}

          {messages.map((message) => {

            {/* USER MESSAGE */}
            if (message.type === "user") {
              return (
                <div
                  key={message.id}
                  className="mb-7 flex justify-end gap-3"
                >

                  <div className="max-w-[530px]">

                    <div className="whitespace-pre-wrap rounded-xl rounded-tr-sm bg-blue-600 px-4 py-3 text-xs leading-5 text-white shadow-sm">
                      {message.text}
                    </div>

                    <p className="mt-1 text-right text-[8px] text-slate-400 dark:text-slate-500">
                      {message.time}
                    </p>

                  </div>

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                    <User size={15} />
                  </div>

                </div>
              );
            }

            {/* AI MESSAGE */}
            return (
              <div
                key={message.id}
                className="mb-7 flex gap-3"
              >

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Bot size={17} />
                </div>

                <div className="max-w-[650px] rounded-xl border border-slate-100 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-800">

                  <p className="whitespace-pre-wrap text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {message.text}
                  </p>

                  {/* SOURCES */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-700">

                      <h4 className="mb-2 text-[10px] font-bold text-slate-800 dark:text-slate-200">
                        Sources:
                      </h4>

                      <ul className="space-y-1.5">

                        {message.sources.map((source, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-[10px] text-slate-500 dark:text-slate-400"
                          >

                            <span className="mt-1 text-green-500">
                              ●
                            </span>

                            <span>

                              <span className="font-semibold text-blue-700 dark:text-blue-400">
                                {source.title || source.standard}
                              </span>

                              {source.description && (
                                <span className="block text-slate-500 dark:text-slate-400">
                                  {source.description}
                                </span>
                              )}

                            </span>

                          </li>
                        ))}

                      </ul>

                    </div>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">

                    <div className="flex gap-4 text-slate-400 dark:text-slate-500">

                      <button className="hover:text-blue-600 dark:hover:text-blue-400">
                        <ThumbsUp size={14} />
                      </button>

                      <button className="hover:text-red-500 dark:hover:text-red-400">
                        <ThumbsDown size={14} />
                      </button>

                      <button className="hover:text-blue-600 dark:hover:text-blue-400">
                        <Bookmark size={14} />
                      </button>

                      <button className="hover:text-blue-600 dark:hover:text-blue-400">
                        <Share2 size={14} />
                      </button>

                    </div>

                    <span className="text-[8px] text-slate-400 dark:text-slate-500">
                      {message.time}
                    </span>

                  </div>

                </div>

              </div>
            );
          })}

          {/* LOADING */}
          {chatLoading && (
            <div className="mb-7 flex gap-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Bot size={17} />
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-5 py-4 text-xs text-slate-400 shadow-sm dark:border-slate-800 dark:bg-slate-800 dark:text-slate-500">

                <Loader2
                  size={14}
                  className="animate-spin"
                />

                Thinking...

              </div>

            </div>
          )}

        </div>

      </div>


      {/* ================= INPUT ================= */}
      <div className="shrink-0 border-t border-slate-100 bg-white px-7 py-5 dark:border-slate-800 dark:bg-slate-900">

        <div className="mx-auto max-w-[700px]">

          {/* Suggestions */}
          <div className="mb-4">

            <p className="mb-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              Suggested Follow-ups
            </p>

            <div className="flex gap-2 overflow-x-auto">

              {[
                "Show me testing requirements",
                "How to apply for BIS license?",
                "List of BIS recognized laboratories",
                "What is the process for certification?",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() => handleSuggestionClick(item)}
                  disabled={chatLoading}
                  className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] text-slate-600 hover:border-blue-300 hover:bg-blue-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/30"
                >

                  {item}

                  <ChevronDown
                    size={11}
                    className="-rotate-90"
                  />

                </button>

              ))}

            </div>

          </div>


          {/* Input Box */}
          <div className="flex items-center rounded-xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-blue-400 dark:border-slate-700 dark:bg-slate-800">

            <select className="ml-1 rounded-lg bg-slate-50 px-3 py-2 text-[10px] text-slate-600 outline-none dark:bg-slate-700 dark:text-slate-300">

              <option>Standard</option>
              <option>Certification</option>
              <option>Laboratory</option>
              <option>Hallmarking</option>
              <option>Consumer</option>

            </select>


            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !chatLoading) {
                  sendMessage();
                }
              }}
              disabled={chatLoading}
              placeholder="Type your question here..."
              className="flex-1 bg-transparent px-4 py-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 disabled:opacity-60 dark:text-slate-200 dark:placeholder:text-slate-500"
            />


            <button className="mr-2 text-slate-400 hover:text-blue-600 dark:text-slate-500 dark:hover:text-blue-400">
              <Paperclip size={17} />
            </button>


            <button
              onClick={sendMessage}
              disabled={chatLoading}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >

              {chatLoading ? (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Send size={17} />
              )}

            </button>

          </div>


          <p className="mt-2 text-center text-[8px] text-slate-400 dark:text-slate-500">
            AI responses may not be 100% accurate. Please refer to official BIS documents.
          </p>

        </div>

      </div>

    </section>
  );
}

export default ChatArea;