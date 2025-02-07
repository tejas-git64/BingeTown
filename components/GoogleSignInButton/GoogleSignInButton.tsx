"use client";

import Image from "next/image";
import React, { useContext, useEffect } from "react";
import googlelogo from "@/public/svgs/google-svgrepo-com.svg";
import { auth, googleProvider, db } from "@/firebase/Firebase";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { getErrorStatus } from "@/helpers/helpers";
import { AuthContext } from "@/auth/AuthContext";

export default function GoogleSignInButton() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthStateChanged(auth, (user) => {
        (async () => {
          //Creating documents from google login
          if (user) {
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            const savedRef = doc(db, "saved", user.uid);
            const savedSnap = await getDoc(savedRef);
            const watchRef = doc(db, "watchlist", user.uid);
            const watchSnap = await getDoc(watchRef);
            if (userSnap.exists() && savedSnap.exists() && watchSnap.exists()) {
              setTimeout(() => {
                setIsLoggedIn(true);
                redirect("/home");
              }, 500);
            } else {
              try {
                //Initialising Users document
                await setDoc(doc(db, "users", user.uid), {
                  email: user.email,
                  fullname: user.displayName,
                  uid: user.uid,
                });
                //Initialising Saved document
                await setDoc(doc(db, "saved", user.uid), {
                  savedtitles: [],
                  uid: user.uid,
                });
                //Initialising Watchlist document
                await setDoc(doc(db, "watchlist", user.uid), {
                  uid: user.uid,
                  watchlist: [],
                });
                setTimeout(() => {
                  redirect(".");
                }, 100);
              } catch (err) {
                console.error(err);
              }
            }
          }
        })();
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const authError = getErrorStatus(err);
      alert(authError);
    }
  };

  useEffect(() => {});

  return (
    <button
      onClick={signInWithGoogle}
      type="button"
      className="mx-auto mb-6 flex h-10 w-full items-center justify-center rounded-md border-2 border-none border-black bg-neutral-200 font-bold outline-none transition-colors hover:bg-white"
    >
      <p className="mr-3 text-[15px] font-extrabold text-neutral-900">
        Sign in with Google
      </p>
      <Image src={googlelogo} alt="google" className="h-6 w-6" />
    </button>
  );
}
