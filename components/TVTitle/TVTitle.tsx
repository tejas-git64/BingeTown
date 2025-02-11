"use client";

import { useState } from "react";
import menu from "@/public/svgs/menu-vertical-svgrepo-com.svg";
import save from "@/public/svgs/save-svgrepo-com.svg";
import watchlist from "@/public/svgs/add-to-queue-svgrepo-com.svg";
import { doc } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase";
import { TVDiscover } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addToSavedList, addToWatchList } from "@/firebase/requests";

export default function TVTitle({
  name,
  first_air_date,
  vote_average,
  poster_path,
  id,
}: TVDiscover) {
  const { push } = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const uid = auth?.currentUser ? auth?.currentUser?.uid : "";
  const savedDocRef = doc(db, "saved", uid);
  const watchDocRef = doc(db, "watchlist", uid);
  const year = new Date(first_air_date).getFullYear();

  function revealMenu(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(true);
  }

  function showTVShow() {
    if (id) push(`/shows/${id}`);
  }
  return (
    <>
      <div
        onClick={showTVShow}
        className="relative mx-auto flex h-72 w-[154px] flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl md:h-[300px] md:w-[154px]"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
          alt="movie-poster"
          width={154}
          height={231}
          className="mb-2 h-[231px] w-[154px] cursor-pointer text-ellipsis rounded-lg object-cover transition-transform ease-in hover:scale-95 md:h-[231px] md:w-[154px]"
        />
        <p className="absolute right-1.5 top-1.5 rounded-sm bg-purple-400 px-1 py-0.5 text-[10.5px] font-extrabold text-black shadow-sm shadow-black">
          TV
        </p>
        <h3 className="line-clamp-1 text-ellipsis whitespace-pre-line text-left text-sm font-semibold text-white sm:text-[12px]">
          {name}
        </h3>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <div className="flex text-[10.5px]">
              <h4 className="mr-1 font-normal text-neutral-400">Rating</h4>
              <h4 className="text-neutral-400">
                {vote_average === 0 ? "NA" : `${vote_average.toFixed(1)}`}
              </h4>
            </div>
            <h3 className="whitespace-nowrap text-[10.5px] font-semibold text-neutral-300">
              {year}
            </h3>
          </div>
          <button
            onClick={revealMenu}
            style={{
              border: "none",
              outline: "none",
            }}
            className="-mr-2 h-auto bg-transparent p-0"
          >
            <Image src={menu} alt="title-menu" className="h-6 w-6" />
          </button>
        </div>
        <div
          onMouseLeave={(e) => {
            e.preventDefault();
            setShowMenu(false);
          }}
          className={`${
            showMenu ? "absolute" : "hidden"
          } bottom-0 flex w-full flex-col rounded-md border border-neutral-700 bg-black py-0`}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWatchList(
                Number(id),
                "tv",
                name,
                poster_path,
                vote_average,
                first_air_date,
                watchDocRef,
              );
            }}
            className="mx-auto flex w-full items-center justify-between rounded-none border-none bg-transparent p-1 px-1.5 outline-none hover:bg-neutral-700"
          >
            <h4 className="text-xs text-white">Add to watchlist</h4>
            <Image src={watchlist} alt="add" className="h-5 w-5 pr-0.5" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToSavedList(
                Number(id),
                name,
                poster_path,
                vote_average,
                first_air_date,
                "tv",
                savedDocRef,
              );
            }}
            className="mx-auto flex w-full items-center justify-between rounded-none border-none bg-transparent p-1 px-1.5 outline-none hover:bg-neutral-700"
          >
            <h4 className="text-xs font-semibold text-white">Save</h4>
            <Image src={save} alt="save" className="mr-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </>
  );
}
