"use client";

import { useContext, useEffect, useState } from "react";
import bookmarked from "@/public/svgs/icons8-bookmark.svg";
import watchlist from "@/public/svgs/list-ul-alt-svgrepo-com.svg";
import tvshow from "@/public/svgs/tv-mode-svgrepo-com.svg";
import movie from "@/public/svgs/movie-svgrepo-com.svg";
import home from "@/public/svgs/home-1-svgrepo-com.svg";
import { auth } from "../../firebase/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { redirect, useRouter } from "next/navigation";
import { LayoutContextTypes } from "@/types/LayoutTypes";
import Image from "next/image";
import { GlobalStore } from "@/store/GlobalStore";
import { AuthContext } from "@/auth/AuthContext";
import { db } from "@/firebase/Firebase";
import { getDefaultAvatarUrl } from "@/utils/avatar";

type UserProfile = {
  fullname?: string;
  photoURL?: string;
};

export default function Sidenav() {
  const { svg, sideNav, setSideNav } =
    useContext<LayoutContextTypes>(GlobalStore);
  const { setIsLoggedIn } = useContext(AuthContext);
  const { push } = useRouter();
  const [titleCount, setTitleCount] = useState({
    saved: 0,
    watchlist: 0,
  });
  const [profile, setProfile] = useState<UserProfile | null>(null);
  function navigateToPage(page: string) {
    push(`/${page}`);
    setSideNav(false);
  }

  const SignOut = () => {
    setSideNav(false);
    signOut(auth);
    setIsLoggedIn(false);
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        redirect("/");
      }
    });
  };

  useEffect(() => {
    let unsubscribeSaved: (() => void) | undefined;
    let unsubscribeWatchlist: (() => void) | undefined;
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      unsubscribeSaved?.();
      unsubscribeWatchlist?.();
      unsubscribeProfile?.();

      if (!user) {
        setTitleCount({
          saved: 0,
          watchlist: 0,
        });
        setProfile(null);
        return;
      }

      if (user) {
        unsubscribeProfile = onSnapshot(
          doc(db, "users", user.uid),
          (snapshot) => {
            setProfile((snapshot.data() as UserProfile | undefined) || null);
          },
        );

        unsubscribeSaved = onSnapshot(
          doc(db, "saved", user.uid),
          (snapshot) => {
            const savedTitles = snapshot.data()?.savedtitles;

            setTitleCount((current) => ({
              ...current,
              saved: Array.isArray(savedTitles) ? savedTitles.length : 0,
            }));
          },
        );

        unsubscribeWatchlist = onSnapshot(
          doc(db, "watchlist", user.uid),
          (snapshot) => {
            const watchlistTitles = snapshot.data()?.watchlist;

            setTitleCount((current) => ({
              ...current,
              watchlist: Array.isArray(watchlistTitles)
                ? watchlistTitles.length
                : 0,
            }));
          },
        );
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSaved?.();
      unsubscribeWatchlist?.();
      unsubscribeProfile?.();
    };
  }, []);

  const currentUser = auth.currentUser;
  const userImage =
    profile?.photoURL ||
    currentUser?.photoURL ||
    getDefaultAvatarUrl(currentUser?.uid || svg, 70);
  const userName =
    profile?.fullname || currentUser?.displayName || "Binge user";

  return (
    <div
      className={`absolute right-0 top-14 z-40 flex h-auto w-80 animate-none flex-col items-center justify-start rounded-bl-3xl border-b border-l border-neutral-700 bg-neutral-900 pb-10 transition-transform ${
        sideNav ? "-translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex h-auto w-full flex-col items-center justify-evenly p-5 pt-8">
        <Image
          src={userImage}
          width={70}
          height={70}
          alt="user-Image"
          quality={100}
          className="mb-2 h-[70px] w-[70px] rounded-full border-none bg-gray-200 text-[10px]"
        />
        <h3 className="mb-2 mt-1 font-semibold text-white">{userName}</h3>
        <div className="mx-auto mt-2 flex w-[250px] items-center justify-center px-3">
          <p className="mr-2 text-sm font-medium text-neutral-500">
            Saved titles:
          </p>
          <p className="text-sm font-semibold text-white">{titleCount.saved}</p>
        </div>
        <div className="mx-auto my-1 flex w-[250px] items-center justify-center px-3">
          <p className="mr-2 text-sm font-medium text-neutral-500">
            Watched titles:
          </p>
          <p className="text-sm font-semibold text-white">
            {titleCount.watchlist}
          </p>
        </div>
      </div>
      <div className="mx-auto flex h-auto w-[250px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-black py-0">
        <div
          onClick={() => navigateToPage("home")}
          role="link"
          tabIndex={0}
          className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
        >
          <Image src={home} alt="profile" className="-ml-0.5 mr-1 h-6 w-6" />
          <p className="text-sm text-white">Home</p>
        </div>
        <div
          onClick={() => navigateToPage("movies")}
          role="link"
          tabIndex={0}
          className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
        >
          <Image src={movie} alt="profile" className="-ml-0.5 mr-1 h-6 w-6" />
          <p className="text-sm text-white">Movies</p>
        </div>
        <div
          onClick={() => navigateToPage("shows")}
          role="link"
          tabIndex={0}
          className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
        >
          <Image src={tvshow} alt="profile" className="-ml-1 h-7 w-7" />
          <p className="text-sm text-white">TV Shows</p>
        </div>
        <div
          onClick={() => navigateToPage("saved")}
          role="link"
          tabIndex={0}
          className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
        >
          <Image src={bookmarked} alt="saved" className="mr-1 h-5 w-5" />
          <p className="text-sm text-white">Saved</p>
        </div>
        <div
          onClick={() => navigateToPage("watchlist")}
          role="link"
          tabIndex={0}
          className="flex w-full cursor-pointer items-center justify-between rounded-b-3xl px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
        >
          <Image src={watchlist} alt="watchlist" className="mr-1.5 h-5 w-5" />
          <p className="text-sm text-white">Watchlist</p>
        </div>
      </div>
      <button
        onClick={SignOut}
        className="mt-10 rounded-full border-none bg-teal-500 px-6 py-2 text-[12px] font-extrabold text-black outline-none transition-colors hover:bg-teal-600"
      >
        Sign out
      </button>
    </div>
  );
}
