"use client";

import React, { useActionState } from "react";
import FormButton from "../FormButton/FormButton";
import Link from "next/link";
import { auth, db } from "@/firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { getErrorStatus } from "@/helpers/helpers";

export default function SignupForm() {
  const [error, action, pending] = useActionState(signUp, "");

  async function signUp(state: string | undefined, data: FormData) {
    const email = data?.get("email") as string;
    const fullname = data?.get("fullname") as string;
    const pass = data?.get("password") as string;
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      onAuthStateChanged(auth, (user) => {
        (async () => {
          if (user) {
            //Initializing Users document
            await setDoc(doc(db, "users", user.uid), {
              email: email,
              fullname: fullname,
              uid: user.uid,
            });
            //Initializing Saved document
            await setDoc(doc(db, "saved", user.uid), {
              savedtitles: [],
              uid: user.uid,
            });
            //Initializing Watchlist document
            await setDoc(doc(db, "watchlist", user.uid), {
              uid: user.uid,
              watchlist: [],
            });
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setTimeout(() => {
                redirect("/home");
              }, 500);
            }
          }
        })();
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const authError = getErrorStatus(err.code);
      state = `AuthError: ${authError}`;
      return state;
    }
  }

  return (
    <form
      action={action}
      className="flex h-auto w-full flex-shrink-0 flex-col items-start justify-center bg-neutral-900 transition-all duration-[2] ease-out"
    >
      <h2 className="mb-14 w-full whitespace-nowrap text-2xl font-extrabold text-teal-500">
        Create an account
      </h2>
      <label
        htmlFor="fullname"
        className="mb-0.5 text-left text-[13px] font-semibold text-neutral-400"
      >
        Fullname
      </label>
      <input
        type="text"
        name="fullname"
        id="fullname"
        placeholder="Enter your fullname here"
        className="mb-4 h-10 w-full rounded-md border-2 border-transparent bg-neutral-700 px-2 text-[14px] font-semibold tracking-wide text-neutral-300 outline-none transition-colors placeholder:text-[14px] placeholder:text-neutral-400 focus:border-teal-500"
        autoComplete="name"
        required
      />
      <label
        htmlFor="email"
        className="mb-0.5 text-left text-[13px] font-semibold text-neutral-400"
      >
        Email Address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email address here"
        className="mb-4 h-10 w-full rounded-md border-2 border-transparent bg-neutral-700 px-2 text-[14px] font-semibold tracking-wide text-neutral-300 outline-none transition-colors placeholder:text-[14px] placeholder:text-neutral-400 focus:border-teal-500"
        autoComplete="email"
        required
      />
      <label
        htmlFor="password"
        className="mb-0.5 text-left text-[13px] font-semibold text-neutral-400"
      >
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password here"
        className="mb-4 h-10 w-full rounded-md border-2 border-transparent bg-neutral-700 px-2 text-[14px] font-semibold tracking-wide text-neutral-300 outline-none transition-colors placeholder:text-[14px] placeholder:text-neutral-400 focus:border-teal-500"
        autoComplete="current-password"
        required
      />
      {error && (
        <h4 className="mx-auto w-full text-center text-sm font-medium text-red-500 transition-all duration-200 ease-in">
          {error}
        </h4>
      )}
      {/* {state?.success && (
        <h4 className="mx-auto w-full rounded-md p-2 text-center text-sm font-extrabold text-green-500 transition-all duration-200 ease-in">
          {state.message}
        </h4>
      )} */}
      <FormButton type="Sign up" pending={pending} />
      <Link
        href={"/login"}
        className="mx-auto mb-4 mt-1 w-auto text-center text-sm font-semibold text-zinc-400 transition-colors hover:text-teal-400"
      >
        Have an account ? Login from here
      </Link>
      <div className="mx-auto my-2 h-auto w-full border-t-2 border-dashed border-zinc-700">
        <p className="mx-auto -mt-[13px] h-6 w-10 bg-neutral-900 text-center text-sm text-white">
          or
        </p>
      </div>
    </form>
  );
}
