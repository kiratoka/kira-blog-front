import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInForm from "./_components/SignInForm";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const page = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <div className=" w-full flex items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-cyan-100 px-2">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-lg border border-cyan-100 flex flex-col gap-7 px-7 py-9 md:px-10 md:py-12 relative">
        {/* Decorative top cyan accent */}
        <div className="absolute -top-4 left-8 w-20 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-80" />
        <h1 className="text-center text-3xl font-extrabold text-cyan-700 mb-0.5 [text-shadow:0px_2px_10px_#c8fafe33]">
          Sign In
        </h1>
        <p className="text-center text-slate-500 text-base mb-2">
          Welcome back! Please enter your credentials.
        </p>
        {/* Sign In Form */}
        <div className="flex flex-col gap-4 mb-1">
          <SignInForm />
        </div>
        {/* Forgot Password link */}
        <div className="w-full flex justify-end mb-1">
          <Link
            href="/auth/forgot"
            className="text-cyan-600 text-sm hover:underline transition font-medium"
          >
            Forgot your password?
          </Link>
        </div>
        {/* Divider */}
        <div className="flex items-center gap-2 my-2">
          <div className="flex-grow border-t border-cyan-100" />
          <span className="text-xs text-slate-400 font-medium">OR</span>
          <div className="flex-grow border-t border-cyan-100" />
        </div>
        {/* Google Sign In Button */}
        <Button
          asChild
          variant="outline"
          className="w-full flex items-center gap-2 justify-center bg-white border-cyan-400 text-cyan-700 font-semibold hover:bg-cyan-50 hover:border-cyan-600 transition"
        >
          <a
            href={`${backendUrl}/auth/google/login`}
            className="flex w-full justify-center items-center gap-2 py-1.5"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              className="mr-2"
              aria-hidden="true"
            >
              <g>
                <path
                  fill="#4285F4"
                  d="M43.6 20.5h-2.1V20H24v8h11.2C34.7 32.4 30 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.4 0 4.6.7 6.5 2l6.4-6.4C33.7 5.1 29.1 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c10.5 0 19.4-7.7 19.4-19.1 0-1.3-.1-2.2-.3-3.4z"
                />
                <path
                  fill="#34A853"
                  d="M6.7 14.3l6.6 4.8C15.2 16.1 19.2 13 24 13c2.4 0 4.6.7 6.5 2l6.4-6.4C33.7 5.1 29.1 3 24 3 16.5 3 10.1 7.6 6.7 14.3z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 43c5.4 0 10-1.8 13.4-4.8l-6.2-5c-1.7 1.2-4 2-7.2 2-5.8 0-10.7-3.8-12.5-9.1l-6.4 4.9C7.8 39.3 15.3 43 24 43z"
                />
                <path
                  fill="#EA4335"
                  d="M43.6 20.5h-2.1V20H24v8h11.2c-1.3 3.5-5.2 6-11.2 6-6.6 0-12-5.4-12-12S17.4 11 24 11c3.1 0 5.7 1 7.7 2.7l5.8-5.6C34.7 5.6 29.7 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c10.5 0 19.4-7.7 19.4-19.1 0-1.1-.1-2.2-.3-3.4z"
                />
              </g>
            </svg>
            <span>Sign in with Google</span>
            <ArrowRightIcon className="w-5 h-5 text-cyan-600 ml-auto" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default page;