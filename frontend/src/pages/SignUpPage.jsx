import { ShipWheelIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-lg ring-1 ring-gray-100 rounded-2xl shadow-2xl overflow-hidden">
        {/* SIGNUP FORM – LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-6 md:p-10 flex flex-col">
          {/* LOGO */}
          <div className="mb-6 flex items-center gap-3">
            <ShipWheelIcon className="w-9 h-9 text-indigo-600" />
            <span className="text-3xl font-extrabold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-500 tracking-widest">
              ConnectX
            </span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error.response?.data?.message || "Something went wrong"}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Create an Account</h2>
              <p className="text-sm text-gray-600">
                Join ConnectX – Powered by InternDesire and start your learning journey with friends!
              </p>
            </div>

            {/* FULL NAME */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={signupData.fullName}
                onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@gmail.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters long</p>
            </div>

            {/* TERMS */}
            <label className="flex items-start gap-3 text-xs text-gray-600">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                required
              />
              <span>
                I agree to the{" "}
                <span className="font-medium text-indigo-600 hover:underline">terms of service</span> and{" "}
                <span className="font-medium text-indigo-600 hover:underline">privacy policy</span>
              </span>
            </label>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
              disabled={isPending}
            >
              {isPending && (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              )}
              {isPending ? "Creating…" : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* SIGNUP ILLUSTRATION – RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 relative items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-emerald-500" />
          <div className="relative z-10 max-w-md p-10 text-center text-white space-y-6">
            <img src="/i.png" alt="Language connection illustration" className="mx-auto w-72 drop-shadow-xl" />
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">Connect with learners of InternDesire</h2>
              <p className="text-sm text-white/90">Practice, learn & code together – InternDesire</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
