import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  Globe,
  Bell,
  ChevronDown,
  LogOut,
  User as UserIcon,
  Sun,
  Moon,
} from "lucide-react";

import { useGlobal } from "../context/GlobalContext";

import AuthModal from "../pages/AuthModal";

function Header() {
  const {
    language,
    setLanguage,
    t,
    user,
    isAuthenticated,
    openAuthModal,
    logout,
    theme,
    toggleTheme,
  } = useGlobal();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className="flex h-[76px] items-center justify-between border-b border-slate-200 bg-white px-7 dark:border-slate-800 dark:bg-slate-900">

      {/* LEFT */}

      <div>
        <h1 className="text-[22px] font-bold text-slate-800 dark:text-slate-100">
          {t("greeting")}
        </h1>

        <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
          {t("subtitle")}
        </p>
      </div>

      {/* RIGHT */}

      <div className="flex items-center gap-5">

        {/* THEME TOGGLE */}

        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* LANGUAGE */}

        <button
          type="button"
          onClick={() =>
            setLanguage(language === "English" ? "हिन्दी" : "English")
          }
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-[11px] text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Globe size={15} />
          {language}
          <ChevronDown size={13} />
        </button>

        {/* NOTIFICATION */}

        {isAuthenticated && (
          <button
            type="button"
            className="relative text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            <Bell size={19} />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
              3
            </span>
          </button>
        )}

        {/* AUTHENTICATED USER */}

        {isAuthenticated ? (
          <div className="relative" ref={menuRef}>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="hidden text-left xl:block">
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-100">
                  {user?.name || "User"}
                </p>
              </div>

              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform dark:text-slate-500 ${
                  menuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-[52px] z-50 w-52 rounded-xl border border-slate-200 bg-white py-2 shadow-lg dark:border-slate-700 dark:bg-slate-800">

                <div className="border-b border-slate-100 px-4 py-2 dark:border-slate-700">
                  <p className="truncate text-[12px] font-semibold text-slate-800 dark:text-slate-100">
                    {user?.name || "User"}
                  </p>
                  <p className="truncate text-[10px] text-slate-400 dark:text-slate-500">
                    {user?.email || ""}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-2 px-4 py-2 text-[12px] text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  <UserIcon size={14} />
                  {t("myProfile")}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-[12px] font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut size={14} />
                  {t("logout")}
                </button>

              </div>
            )}

          </div>
        ) : (
          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() => openAuthModal("login")}
              className="rounded-lg px-3 py-2 text-[12px] font-semibold text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {t("signIn")}
            </button>

            <button
              type="button"
              onClick={() => openAuthModal("signup")}
              className="rounded-lg bg-blue-600 px-4 py-2 text-[12px] font-semibold text-white hover:bg-blue-700"
            >
              {t("createAccount")}
            </button>

          </div>
        )}

      </div>

      <AuthModal />

    </header>
  );
}

export default Header;