import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
} from "lucide-react";

import { useGlobal } from "../context/GlobalContext";

function AuthModal() {
  const {
    authModal,
    closeAuthModal,
    switchAuthView,
    login,
    signup,
    authError,
  } = useGlobal();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!authModal.open) {
    return null;
  }

  const isLogin = authModal.view === "login";

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    let result;

    if (isLogin) {
      result = await login({
        email: form.email,
        password: form.password,
      });
    } else {
      result = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
    }

    if (result?.success) {
      setForm({
        name: "",
        email: "",
        password: "",
      });

      setShowPassword(false);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 px-4">

      <div className="relative w-full max-w-[400px] rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
        >
          <X size={18} />
        </button>

        {/* LOGIN / SIGNUP TABS */}

        <div className="mb-7 flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">

          <button
            type="button"
            onClick={() => switchAuthView("login")}
            className={`flex-1 rounded-md py-2 text-[13px] font-semibold transition-colors ${
              isLogin
                ? "bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => switchAuthView("signup")}
            className={`flex-1 rounded-md py-2 text-[13px] font-semibold transition-colors ${
              !isLogin
                ? "bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400"
            }`}
          >
            Create Account
          </button>

        </div>

        {/* TITLE */}

        <h2 className="text-[22px] font-bold text-slate-800 dark:text-slate-100">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>

        <p className="mb-6 mt-1 text-[12.5px] text-slate-500 dark:text-slate-400">
          {isLogin
            ? "Sign in to continue to your BIS AI Assistant workspace."
            : "Get standards guidance tailored to your industry."}
        </p>

        {/* BACKEND ERROR */}

        {authError && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-600 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
            {authError}
          </div>
        )}

        {/* FORM */}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* NAME - ONLY SIGNUP */}

          {!isLogin && (
            <div>

              <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-300">
                Full name
              </label>

              <div className="flex items-center rounded-lg border border-slate-200 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 dark:focus-within:ring-blue-900/30">

                <UserIcon size={15} className="text-slate-400 dark:text-slate-500" />

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full bg-transparent px-2.5 py-2.5 text-[13px] outline-none dark:text-slate-200"
                  required
                />

              </div>

            </div>
          )}

          {/* EMAIL */}

          <div>

            <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-300">
              Email address
            </label>

            <div className="flex items-center rounded-lg border border-slate-200 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 dark:focus-within:ring-blue-900/30">

              <Mail size={15} className="text-slate-400 dark:text-slate-500" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="w-full bg-transparent px-2.5 py-2.5 text-[13px] outline-none dark:text-slate-200"
                required
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div>

            <label className="mb-1.5 block text-[12px] font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>

            <div className="flex items-center rounded-lg border border-slate-200 px-3 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 dark:focus-within:ring-blue-900/30">

              <Lock size={15} className="text-slate-400 dark:text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                className="w-full bg-transparent px-2.5 py-2.5 text-[13px] outline-none dark:text-slate-200"
                required
                minLength={isLogin ? undefined : 8}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>

            </div>

          </div>

          {/* LOGIN OPTIONS */}

          {isLogin && (
            <div className="flex items-center justify-between text-[12px]">

              <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <input type="checkbox" className="accent-blue-600" />
                Keep me signed in
              </label>

              <button
                type="button"
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot password?
              </button>

            </div>
          )}

          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-[13.5px] font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Sign in" : "Create account"}
          </button>

        </form>

        {/* SWITCH AUTH */}

        <p className="mt-6 text-center text-[12.5px] text-slate-500 dark:text-slate-400">

          {isLogin ? "Don't have an account? " : "Already have an account? "}

          <button
            type="button"
            onClick={() => switchAuthView(isLogin ? "signup" : "login")}
            className="font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isLogin ? "Create one" : "Sign in"}
          </button>

        </p>

      </div>

    </div>
  );
}

export default AuthModal;