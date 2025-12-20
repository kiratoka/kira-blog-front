"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action} className="flex flex-col gap-6">
      {/* Message/Error */}
      {!!state?.message && (
        <div className="w-full bg-cyan-50 border border-cyan-200 text-cyan-700 rounded-lg px-4 py-2 text-center text-sm font-medium mb-2 animate-in fade-in">
          {state.message}
        </div>
      )}

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="name"
          className="block text-slate-700 font-semibold"
        >
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={state?.data?.name}
          className="bg-white border border-cyan-200 focus:border-cyan-500 focus:ring-cyan-100 rounded-xl px-4 py-2 transition-all duration-200 w-full placeholder:text-slate-400"
          autoComplete="name"
        />
        {state?.errors?.name && (
          <p className="text-xs text-red-500 mt-1">{state.errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="email"
          className="block text-slate-700 font-semibold"
        >
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="john@example.com"
          defaultValue={state?.data?.email}
          className="bg-white border border-cyan-200 focus:border-cyan-500 focus:ring-cyan-100 rounded-xl px-4 py-2 transition-all duration-200 w-full placeholder:text-slate-400"
          autoComplete="email"
        />
        {state?.errors?.email && (
          <p className="text-xs text-red-500 mt-1">{state.errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="password"
          className="block text-slate-700 font-semibold"
        >
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data?.password}
          autoComplete="new-password"
          className="bg-white border border-cyan-200 focus:border-cyan-500 focus:ring-cyan-100 rounded-xl px-4 py-2 transition-all duration-200 w-full placeholder:text-slate-400"
        />
        {!!state?.errors?.password && Array.isArray(state.errors.password) ? (
          <div className="text-xs text-red-500 mt-1">
            <p>Password must:</p>
            <ul className="list-disc list-inside ml-2">
              {state.errors.password.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        ) : !!state?.errors?.password ? (
          <p className="text-xs text-red-500 mt-1">{state.errors.password}</p>
        ) : null}
      </div>

      <SubmitButton className="mt-2 bg-gradient-to-r from-cyan-500 to-blue-400 hover:from-cyan-600 hover:to-blue-500 text-white font-semibold rounded-xl py-2 shadow-md transition-all w-full">
        Sign Up
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;