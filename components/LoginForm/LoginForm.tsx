"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import FormButton from "../FormButton/FormButton";
import { auth } from "@/firebase/Firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { redirect } from "next/navigation";
import { getErrorStatus } from "@/helpers/helpers";

export default function LoginForm() {
  const logIn = async (state: string | undefined, data: FormData) => {
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    let newState = state;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setTimeout(() => {
            redirect("/home");
          }, 100);
        }
      });
    } catch (err: any) {
      const authError = getErrorStatus(err.code);
      newState = `AuthError: ${authError}`;
      return newState;
    }
  };

  const [error, action, pending] = useActionState(logIn, "");

  useEffect(() => {
    console.log(error);
  }, [error]);

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
      {error && <h4 className="form-error">{error}</h4>}
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
