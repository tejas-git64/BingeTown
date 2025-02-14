"use client";

import React, { useActionState, useContext } from "react";
import FormButton from "../FormButton/FormButton";
import Link from "next/link";
import { auth, db } from "@/firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { getErrorStatus } from "@/helpers/helpers";
import { GlobalStore } from "@/store/GlobalStore";
import { LayoutContextTypes } from "@/types/LayoutTypes";

export default function SignupForm() {
  const [error, action, pending] = useActionState(signUp, "");
  const { svg } = useContext<LayoutContextTypes>(GlobalStore);
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
            updateProfile(user, {
              displayName: user.displayName || fullname,
              photoURL:
                user.photoURL ||
                `https://api.dicebear.com/7.x/notionists/svg?seed=${svg}&size=32&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear,solid&glassesProbability=50`,
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
    <form action={action} className="form-container">
      <h2 className="form-heading">Create an account</h2>
      <label htmlFor="fullname" className="form-label">
        Fullname
      </label>
      <input
        type="text"
        name="fullname"
        id="fullname"
        placeholder="Enter your fullname here"
        className="form-input"
        autoComplete="name"
        required
      />
      <label htmlFor="email" className="form-label">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email address here"
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
      <FormButton type="Sign up" pending={pending} />
      <Link href={"/login"} className="form-link">
        Have an account ? Login from here
      </Link>
      <div className="form-separator">
        <p className="separator-text">
          or
        </p>
      </div>
    </form>
  );
}
