"use client";

import { useContext } from "react";
import bookmarked from "@/public/svgs/icons8-bookmark.svg";
import watchlist from "@/public/svgs/list-ul-alt-svgrepo-com.svg";
// import close from "../../assets/images/icons8-close-48.png";
import tvshow from "@/public/svgs/tv-mode-svgrepo-com.svg";
import movie from "@/public/svgs/movie-svgrepo-com.svg";
import home from "@/public/svgs/home-1-svgrepo-com.svg";
import { auth } from "../../firebase/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { LayoutContextTypes } from "@/types/LayoutTypes";
import Image from "next/image";
import { GlobalStore } from "@/store/GlobalStore";

export default function Sidenav() {
  const { sideNav, setSideNav } = useContext<LayoutContextTypes>(GlobalStore);
  const { push } = useRouter();
  const { svg } = useContext(GlobalStore);
  function navigateToPage(page: string) {
    push(`/${page}`);
    setSideNav(false);
  }

  const SignOut = async () => {
    setSideNav(false);
    try {
      await signOut(auth);
      onAuthStateChanged(auth, (user) => {
        if (user === null) {
          push("/");
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 z-20 h-full w-80 animate-none border-l-[1px] border-neutral-800 bg-neutral-900 transition-all ease-in-out ${
          sideNav ? "right-0" : "-right-full sm:-right-96"
        }`}
      >
        <div className="flex h-36 w-full flex-col items-center justify-evenly p-1">
          <Image
            src={
              auth.currentUser?.photoURL ||
              `https://api.dicebear.com/7.x/notionists/svg?seed=${svg}&size=32&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear,solid&glassesProbability=50`
            }
            width={20}
            height={20}
            alt="user-Image"
            className="h-20 w-20 rounded-full border-none bg-gray-200 text-[10px]"
          />
        </div>
        <div className="mx-auto flex h-auto w-[250px] flex-col items-center justify-center rounded-3xl bg-black py-0">
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
          className="mt-20 rounded-full border-none bg-teal-500 px-6 py-2 text-[12px] font-extrabold text-black outline-none transition-colors hover:bg-teal-600 md:mt-40"
        >
          Sign out
        </button>
      </div>
    </>
  );
}
