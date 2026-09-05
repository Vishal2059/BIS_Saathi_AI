import {
  Plus,
  LayoutDashboard,
  Bot,
  BookOpen,
  ShieldCheck,
  FlaskConical,
  Gem,
  Users,
  FileText,
  HelpCircle,
  MessageSquare,
  Bookmark,
  MessageCircle,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/bis-logo.png";
import { useGlobal } from "../context/GlobalContext";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "AI Assistant", path: "/assistant", icon: Bot },
  { name: "Indian Standards", path: "/standards", icon: BookOpen },
  { name: "Certification", path: "/certification", icon: ShieldCheck },
  { name: "Laboratories", path: "/laboratories", icon: FlaskConical },
  { name: "Hallmarking", path: "/hallmarking", icon: Gem },
  { name: "Consumer Zone", path: "/consumer-zone", icon: Users },
  { name: "Document Library", path: "/document-library", icon: FileText },
  { name: "Ask a Question", path: "/ask-question", icon: HelpCircle },
  { name: "My Chats", path: "/my-chats", icon: MessageSquare },
  { name: "Saved Results", path: "/saved-results", icon: Bookmark },
  { name: "Feedback", path: "/feedback", icon: MessageCircle },
];

function Sidebar() {
  const { createNewChat, clearCurrentChat } = useGlobal();
  const navigate = useNavigate();

  const handleNewChat = async () => {
    clearCurrentChat();
    await createNewChat();
    navigate("/assistant");
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-[245px] flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

      {/* Logo */}

      <div className="flex h-[76px] items-center gap-3 border-b border-slate-100 px-5 dark:border-slate-800">

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
          <img src={logo} alt="BIS Saathi Logo" className="h-15 w-20" />
        </div>

        <div>
          <h1 className="text-[13px] font-bold text-slate-800 dark:text-slate-100">
            Bureau of Indian Standards
          </h1>

          <p className="text-[9px] font-medium text-blue-600 dark:text-blue-400">
            AI Intelligent Assistant
          </p>
        </div>

      </div>

      {/* New Chat */}

      <div className="px-4 pt-4">

        <button
          onClick={handleNewChat}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus size={16} />
          New Chat
        </button>

      </div>

      {/* Menu */}

      <nav className="mt-4 flex-1 overflow-y-auto px-3">

        <div className="space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[11px] font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                  }`
                }
              >
                <Icon size={16} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* BIS Club Card */}

      <div className="px-4 pb-3">

        <div className="overflow-hidden rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-900/40 dark:bg-blue-950/30">

          <h3 className="text-xs font-bold text-blue-800 dark:text-blue-300">
            Join BIS Standards Club
          </h3>

          <p className="mt-2 text-[9px] leading-4 text-slate-500 dark:text-slate-400">
            Be a part of a network that promotes
            standardization awareness and knowledge.
          </p>

          <button className="mt-3 rounded-lg bg-blue-600 px-3 py-2 text-[9px] font-semibold text-white hover:bg-blue-700">
            Know More
          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 px-5 py-3 dark:border-slate-800">
        <p className="text-[9px] text-slate-400 dark:text-slate-500">
          © 2024 BIS. All rights reserved.
        </p>
        <p className="mt-1 text-[9px] text-slate-400 dark:text-slate-500">
          Version 1.0.0
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;