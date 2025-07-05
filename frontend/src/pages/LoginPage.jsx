import { ShipWheelIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

/**
 * Modern, responsive login page styled purely with Tailwind utility classes (no DaisyUI).
 * Component hierarchy is unchanged—only class names were upgraded for a fresh look.
 */
const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Optimized login hook
  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-lg ring-1 ring-gray-100 rounded-2xl shadow-2xl overflow-hidden">
        {/* LOGIN FORM SECTION */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col">
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-3">
            <ShipWheelIcon className="w-9 h-9 text-indigo-600" />
            <span className="text-3xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-500 tracking-widest">
              ConnectX
            </span>
          </div>

          {/* ERROR MESSAGE DISPLAY */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error.response?.data?.message || "Something went wrong"}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
              <p className="text-sm text-gray-600">
                Sign in to your account to continue learning or discussing
              </p>
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="hello@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
              disabled={isPending}
            >
              {isPending && <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />}
              {isPending ? "Signing in…" : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-indigo-600 hover:underline">
                Create one
              </Link>
            </p>
          </form>
        </div>

        {/* IMAGE SECTION */}
        <div className="hidden lg:flex w-full lg:w-1/2 relative items-center justify-center">
          {/* Color overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-emerald-500" />

          <div className="relative z-10 max-w-md p-10 text-center text-white space-y-6">
            <img src="/i.png" alt="Language connection illustration" className="mx-auto w-72 drop-shadow-xl" />
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Connect with learners of InternDesire</h2>
              <p className="text-sm text-white/90">
                Practice, learn & code together – InternDesire
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
