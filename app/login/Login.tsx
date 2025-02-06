/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  AuthError,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, googleProvider } from "../../firebase/Firebase";
import googlelogo from "../../assets/images/icons8-google-48.png";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Credentials } from "@/types/Auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function Login() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [creds, setCreds] = useState<Credentials>({
    email: "",
    password: "",
  });

  function getAuthStatus(err: AuthError) {
    switch (true) {
      case err.code === "auth/invalid-email":
        return "Invalid email format";
        break;
      case err.code === "auth/user-disabled":
        return "User account is disabled";
        break;
      case err.code === "auth/user-not-found":
        return "User account not found";
        break;
      case err.code === "auth/wrong-password":
        return "Entered wrong password";
        break;
      default:
        return "";
        break;
    }
  }

  //Form Validation Function
  function formValidation() {
    if (creds.email.length === 0 || creds.password.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setCreds((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  const logIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, creds.email, creds.password);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
          setTimeout(() => {
            redirect("/home");
          }, 50);
        }
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      const authError = getAuthStatus(error);
      setError(authError);
    }
  };

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
            setLoggedIn(true);
            if (userSnap.exists() && savedSnap.exists() && watchSnap.exists()) {
              setTimeout(() => {
                redirect("/home");
              }, 50);
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
                  redirect("/home");
                }, 100);
              } catch (err) {
                console.log(err);
              }
            }
          }
        })();
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    formValidation();
  }, [creds.email.length, creds.password.length]);

  return (
    <>
      <div className="relative grid h-[calc(100dvh-0dvh)] w-full place-items-center bg-neutral-800 p-4">
        <Link
          href="/"
          className="absolute right-5 top-5 h-14 w-auto font-bold text-zinc-400 hover:text-teal-400"
        >
          ⬅ Back to site
        </Link>
        <form className="flex h-auto w-full flex-col items-start justify-center rounded-xl bg-zinc-900 p-8 px-6 shadow-xl transition-all duration-[2] ease-out md:w-[450px] md:px-10">
          <h2 className="mb-14 w-full whitespace-nowrap text-2xl font-extrabold text-teal-700">
            Login
          </h2>
          <label
            htmlFor="email"
            className="mb-0.5 text-left text-sm font-semibold text-gray-200"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            placeholder="Enter email address"
            className="mb-4 h-10 w-full rounded-lg border-none bg-neutral-700 px-3 font-semibold text-zinc-300 outline-none placeholder:text-sm placeholder:text-gray-400"
            autoComplete="email"
            required
          />
          <label
            htmlFor="password"
            className="mb-0.5 text-left text-sm font-semibold text-gray-200"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            placeholder="Enter your password"
            className="mb-4 h-10 w-full rounded-lg border-none bg-neutral-700 px-3 font-semibold text-zinc-300 outline-none placeholder:text-sm placeholder:text-gray-400"
            autoComplete="current-password"
            required
          />
          {error && (
            <h4 className="mx-auto -mt-6 mb-4 w-full rounded-md p-2 font-semibold text-red-500 transition-all duration-[2s] ease-in md:w-80">
              {error}
            </h4>
          )}
          {loggedIn && (
            <h4 className="mx-auto -mt-4 mb-8 w-full rounded-md bg-green-500 p-3 font-bold text-black transition-all duration-[2s] ease-in md:w-80">
              Logged in ✔️
            </h4>
          )}
          <button
            onClick={logIn}
            type="submit"
            disabled={isDisabled}
            className={`${
              isDisabled
                ? "cursor-not-allowed brightness-50"
                : "bg-black text-gray-200"
            } mx-auto my-4 mb-0 h-12 w-full border-none bg-black text-sm font-bold tracking-wider text-gray-200 outline-none md:w-80`}
          >
            Continue Binging 🍿🍾
          </button>
          <Link
            href="/signup"
            className="mx-auto my-4 w-full text-sm text-zinc-400 hover:text-teal-400 md:w-72"
          >
            Don&apos;t have an account ?
          </Link>
          <div className="mx-auto my-2 h-auto w-full border-t-2 border-zinc-700 md:w-80">
            <p className="mx-auto -mt-[15px] h-10 w-12 bg-zinc-900 text-sm">
              or
            </p>
          </div>
          <button
            onClick={signInWithGoogle}
            type="button"
            className="mx-auto mb-6 flex h-10 w-full items-center justify-center border-none bg-white font-bold outline-none md:w-80"
          >
            {" "}
            <p className="mr-4 text-sm font-semibold text-black">
              Sign in with Google
            </p>
            <Image src={googlelogo} alt="google" className="h-7 w-7" />
          </button>
        </form>
      </div>
    </>
  );
}
