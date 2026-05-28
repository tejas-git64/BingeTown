"use client";

import React, { useActionState } from "react";
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
import { getDefaultAvatarUrl } from "@/utils/avatar";

async function signUp(_state: string | undefined, data: FormData) {
  const email = data?.get("email") as string;
  const fullname = data?.get("fullname") as string;
  const pass = data?.get("password") as string;
  try {
    await createUserWithEmailAndPassword(auth, email, pass);
    onAuthStateChanged(auth, (user) => {
      (async () => {
        if (user) {
          const photoURL = user.photoURL || getDefaultAvatarUrl(user.uid, 70);

          await updateProfile(user, {
            displayName: user.displayName || fullname,
            photoURL,
          });

          //Initializing Users document
          await setDoc(doc(db, "users", user.uid), {
            email: email,
            fullname: fullname,
            photoURL,
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
  } catch {
    return undefined;
  }
}

export default function SignupForm() {
  const [, action, pending] = useActionState(signUp, "");

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
      <FormButton type="Sign up" pending={pending} />
      <Link href={"/login"} className="form-link">
        Have an account ? Login from here
      </Link>
      <div className="form-separator">
        <p className="separator-text">or</p>
      </div>
    </form>
  );
}
