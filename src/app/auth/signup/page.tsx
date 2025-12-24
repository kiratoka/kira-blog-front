import Link from "next/link";
import SignUpForm from "./_components/SignUpForm";

const page = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-cyan-100 px-2">
      <div className="w-full max-w-md bg-white/90 rounded-3xl shadow-lg border border-cyan-100 flex flex-col gap-7 px-7 py-9 md:px-10 md:py-12 relative">
        {/* Decorative top cyan accent */}
        <div className="absolute -top-4 left-8 w-20 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-80" />
        <h1 className="text-center text-3xl font-extrabold text-cyan-700 mb-0.5 [text-shadow:0px_2px_10px_#c8fafe33]">
          Sign Up
        </h1>
        <p className="text-center text-slate-500 text-base mb-2">
          Create a new account to get started.
        </p>
        {/* Sign Up Form */}
        <div className="flex flex-col gap-4 mb-1">
          <SignUpForm />
        </div>
        <div className="w-full flex justify-center mt-2">
          <span className="text-sm text-slate-500 mr-2">Already have an account?</span>
          <Link
            href="/auth/signin"
            className="text-cyan-600 text-sm hover:underline transition font-medium"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;