"use client";

import SignupForm from "@/components/SignupForm/SignupForm";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <div className="relative grid h-[100dvh] max-h-[1000px] w-full place-items-center bg-neutral-900 p-4">
        <Link
          href="/"
          className="absolute right-4 top-3 w-auto text-sm font-semibold text-zinc-400 transition-colors hover:text-teal-400"
        >
          ⬅ Back to site
        </Link>
        <SignupForm />
      </div>
    </>
  );
}
