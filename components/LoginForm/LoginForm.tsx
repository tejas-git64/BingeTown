"use client";

import Link from "next/link";
import { useActionState } from "react";
import FormButton from "../FormButton/FormButton";
import { auth } from "@/firebase/Firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";

export default function LoginForm() {
  const logIn = async (_state: string | undefined, data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setTimeout(() => {
            redirect("/home");
          }, 100);
        }
      });
    } catch {
      return undefined;
    }
  };

  const [, action, pending] = useActionState(logIn, "");

  return (
    <form action={action} className="form-container">
      <h2 className="form-heading">Login</h2>
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter email address here"
        className="form-input"
        autoComplete="email"
        required
      />
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password here"
        className="form-input"
        autoComplete="current-password"
        required
      />
      <FormButton type="Login" pending={pending} />
      <Link href={"/signup"} className="form-link">
        Don&apos;t have an account ?
      </Link>
      <div className="form-separator">
        <p className="separator-text">or</p>
      </div>
    </form>
  );
}
