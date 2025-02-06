"use client";

import { useState } from "react";
import menu from "@/public/svgs/menu-alt-05-svgrepo-com.svg";
import save from "@/public/svgs/icons8-search.svg";
import watchlist from "@/public/svgs/list-ul-alt-svgrepo-com.svg";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../firebase/Firebase";
import { Movie } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function MovieTitle({
  title,
  release_date,
  vote_average,
  poster_path,
  id,
}: Movie) {
  const { push } = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const uid = auth.currentUser ? auth.currentUser?.uid : "";
  const savedDocRef = doc(db, "saved", uid);
  const watchDocRef = doc(db, "watchlist", uid);
  const year = new Date(release_date).getFullYear();

  function showMovie(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) {
    e.preventDefault();
    push(`/movies/${id}`);
  }

  function revealMenu(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(true);
  }

  async function addToSavedList(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    movieid: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
  ) {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(false);
    await updateDoc(savedDocRef, {
      savedtitles: arrayUnion({
        id: movieid,
        type: "movie",
        title: title,
        poster_path: poster_path,
        vote_average: vote_average,
        release_date: release_date,
      }),
    });
  }
  async function addToWatchList(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    movieid: number,
    title: string,
    poster_path: string,
    vote_average: number,
    release_date: string,
  ) {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(false);
    await updateDoc(watchDocRef, {
      watchlist: arrayUnion({
        id: movieid,
        type: "movie",
        watched: false,
        title: title,
        poster_path: poster_path,
        vote_average: vote_average,
        release_date: release_date,
      }),
    });
  }

  return (
    <>
      <div
        onClick={showMovie}
        className="relative mx-auto flex h-[300px] w-[154px] flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
          alt="movie-poster"
          width={154}
          height={231}
          className="mx-auto mb-2 h-[231px] w-[154px] cursor-pointer rounded-lg transition-all duration-0 ease-in hover:scale-95 md:h-auto md:w-auto"
        />
        <h3 className="line-clamp-1 text-ellipsis whitespace-pre-line text-left text-[12px] font-semibold text-white">
          {title}
        </h3>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <div className="flex text-[10.5px]">
              <h4 className="mr-1 font-normal text-neutral-400">Rating</h4>
              <h4 className="text-neutral-400">
                {vote_average === 0 ? "NA" : `${vote_average.toFixed(1)}/10`}
              </h4>
            </div>
            <h3 className="whitespace-nowrap text-[10.5px] font-semibold text-neutral-300">
              {year}
            </h3>
          </div>
          <button
            onClick={revealMenu}
            style={{
              outline: "none",
            }}
            className="-mr-2 -mt-3 h-auto border-none bg-transparent p-0"
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
            onClick={(e) =>
              addToWatchList(
                e,
                id,
                title,
                poster_path,
                vote_average,
                release_date.toString(),
              )
            }
            className="mx-auto flex w-full items-center justify-between rounded-none border-none bg-transparent p-1 px-1.5 outline-none hover:bg-neutral-700"
          >
            <h4 className="text-xs text-white">Add to watchlist</h4>
            <Image src={watchlist} alt="add" className="h-5 w-5 pr-0.5" />
          </button>
          <button
            onClick={(e) =>
              addToSavedList(
                e,
                id,
                title,
                poster_path,
                vote_average,
                release_date.toString(),
              )
            }
            className="mx-auto flex w-full items-center justify-between rounded-none border-none bg-transparent p-1 px-1.5 outline-none hover:bg-neutral-700"
          >
            <h4 className="text-xs font-semibold text-white">Save</h4>
            <Image src={save} alt="save" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
