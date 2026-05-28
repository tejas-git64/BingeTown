"use client";

import Image from "next/image";
import React, { useContext } from "react";
import googleIcon from "@/public/svgs/google-svgrepo-com.svg";
import { auth, googleProvider, db } from "@/firebase/Firebase";
import { signInWithPopup, updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { getErrorStatus } from "@/helpers/helpers";
import { AuthContext } from "@/auth/AuthContext";
import { getDefaultAvatarUrl } from "@/utils/avatar";

export default function GoogleSignInButton() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider);
      const photoURL = user.photoURL || getDefaultAvatarUrl(user.uid, 70);

      if (!user.photoURL) {
        await updateProfile(user, { photoURL });
      }

      const userRef = doc(db, "users", user.uid);
      const savedRef = doc(db, "saved", user.uid);
      const savedSnap = await getDoc(savedRef);
      const watchRef = doc(db, "watchlist", user.uid);
      const watchSnap = await getDoc(watchRef);

      await setDoc(
        userRef,
        {
          email: user.email,
          fullname: user.displayName,
          photoURL,
          uid: user.uid,
        },
        { merge: true },
      );

      if (!savedSnap.exists()) {
        await setDoc(savedRef, {
          savedtitles: [],
          uid: user.uid,
        });
      }

      if (!watchSnap.exists()) {
        await setDoc(watchRef, {
          uid: user.uid,
          watchlist: [],
        });
      }

      setTimeout(() => {
        setIsLoggedIn(true);
        redirect("/home");
      }, 200);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const authError = getErrorStatus(err);
      alert(authError);
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      type="button"
      className="mx-auto mb-6 flex h-10 w-full items-center justify-center rounded-md border-2 border-none border-black bg-neutral-200 font-bold outline-none transition-colors hover:bg-white"
    >
      <p className="mr-3 text-[15px] font-extrabold text-neutral-900">
        Sign in with Google
      </p>
      <Image src={googleIcon} alt="google" className="h-6 w-6" />
    </button>
  );
}
