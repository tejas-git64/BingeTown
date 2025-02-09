"use client";

import { useContext, useEffect, useState } from "react";
import bookmarked from "@/public/svgs/icons8-bookmark.svg";
import watchlist from "@/public/svgs/list-ul-alt-svgrepo-com.svg";
import tvshow from "@/public/svgs/tv-mode-svgrepo-com.svg";
import movie from "@/public/svgs/movie-svgrepo-com.svg";
import home from "@/public/svgs/home-1-svgrepo-com.svg";
import { auth } from "../../firebase/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import { LayoutContextTypes } from "@/types/LayoutTypes";
import Image from "next/image";
import { GlobalStore } from "@/store/GlobalStore";
import { AuthContext } from "@/auth/AuthContext";
import { getDocCount } from "@/firebase/requests";

export default function Sidenav() {
  const { svg, sideNav, setSideNav } =
    useContext<LayoutContextTypes>(GlobalStore);
  const { setIsLoggedIn } = useContext(AuthContext);
  const { push } = useRouter();
  const [titleCount, setTitleCount] = useState({
    saved: 0,
    watchlist: 0,
  });
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
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const watchlistCount = await getDocCount(user.uid, "watchlist");
        const savedCount = await getDocCount(user.uid, "saved");
        if (watchlistCount && savedCount) {
          setTitleCount(() => ({
            saved: savedCount,
            watchlist: watchlistCount,
          }));
        }
      }
    });
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 z-20 flex max-h-full min-h-[1290px] w-80 animate-none flex-col items-center justify-start border-l-[1px] border-neutral-800 bg-neutral-900 transition-all ease-in-out ${
          sideNav ? "right-0" : "-right-full sm:-right-96"
        }`}
      >
        <div className="mb-2 flex h-auto w-full flex-col items-center justify-evenly space-y-3 p-5 pt-24">
          <Image
            src={
              auth.currentUser?.photoURL ||
              `https://api.dicebear.com/7.x/notionists/svg?seed=${svg}&size=32&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear,solid&glassesProbability=50`
            }
            width={32}
            height={32}
            alt="user-Image"
            quality={100}
            className="h-[32px] w-[32px] rounded-full border-none bg-gray-200 text-[10px]"
          />
          <h3 className="font-semibold text-white">
            {auth.currentUser?.displayName}
          </h3>
          <div className="mx-auto flex w-[250px] items-center justify-center px-3">
            <p className="mr-2 text-sm font-medium text-neutral-500">
              Saved titles:
            </p>
            <p className="text-sm font-semibold text-white">
              {titleCount.saved}
            </p>
          </div>
          <div className="mx-auto flex w-[250px] items-center justify-center px-3">
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
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
          >
            <Image src={home} alt="profile" className="-ml-0.5 mr-1 h-6 w-6" />
            <p className="text-sm text-white">Home</p>
          </div>
          <div
            onClick={() => navigateToPage("movies")}
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
          >
            <Image src={movie} alt="profile" className="-ml-0.5 mr-1 h-6 w-6" />
            <p className="text-sm text-white">Movies</p>
          </div>
          <div
            onClick={() => navigateToPage("tvshows")}
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
          >
            <Image src={tvshow} alt="profile" className="-ml-1 h-7 w-7" />
            <p className="text-sm text-white">TV Shows</p>
          </div>
          <div
            onClick={() => navigateToPage("saved")}
            className="flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
          >
            <Image src={bookmarked} alt="saved" className="mr-1 h-5 w-5" />
            <p className="text-sm text-white">Saved</p>
          </div>
          <div
            onClick={() => navigateToPage("watchlist")}
            className="flex w-full cursor-pointer items-center justify-between rounded-b-3xl px-6 py-3 transition-colors duration-75 hover:bg-neutral-700"
          >
            <Image src={watchlist} alt="watchlist" className="mr-1.5 h-5 w-5" />
            <p className="text-sm text-white">Watchlist</p>
          </div>
        </div>
        <button
          onClick={SignOut}
          className="mt-12 rounded-full border-none bg-teal-500 px-6 py-2 text-[12px] font-extrabold text-black outline-none transition-colors hover:bg-teal-600 md:mt-20"
        >
          Sign out
        </button>
      </div>
    </>
  );
}
