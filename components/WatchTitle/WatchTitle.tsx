"use client";
import { doc } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase";
import trash from "../../assets/images/icons8-trash-24.png";
import { SavedTitleType } from "@/types/LayoutTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { removeTitle } from "@/firebase/requests";

export default function WatchTitle({
  title,
  id,
  poster_path,
  release_date,
  type,
  vote_average,
}: SavedTitleType) {
  const { push } = useRouter();
  const uid = auth.currentUser ? auth.currentUser?.uid : "";
  const docRef = doc(db, "watchlist", uid);
  const year = new Date(release_date).getFullYear();

  function navigateToShow(type: string, id: number) {
    if (type === "tv") push(`/tvshows/${id}`);
    else push(`/movies/${id}`);
  }

  return (
    <>
      <div
        onClick={() => navigateToShow(type, id)}
        className="relative mx-auto flex h-[300px] w-[154px] flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
          alt="image-cover"
          height={231}
          width={154}
          className="mx-auto h-[231px] w-[154px] cursor-pointer rounded-lg transition-all duration-0 ease-in hover:scale-95 md:h-auto md:w-auto"
        />
        <h3 className="mt-1 line-clamp-1 text-ellipsis whitespace-pre-line text-left text-[12px] font-semibold text-white">
          {title}
        </h3>
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col items-start justify-center">
            <div className="flex text-[10.5px]">
              <h4 className="mr-1 font-normal text-neutral-400">Rating:</h4>
              <h4 className="text-neutral-400">
                {vote_average === 0 ? "NA" : `${vote_average}/10`}
              </h4>
            </div>
            <h3 className="whitespace-nowrap text-[10.5px] font-semibold text-neutral-300">
              {year}
            </h3>
          </div>
          <button
            onClick={(e) =>
              removeTitle(e, {
                title,
                id,
                poster_path,
                release_date,
                type,
                vote_average,
                watched: false,
                docRef,
              })
            }
            className="-mr-1 h-auto border-none bg-transparent p-0"
          >
            <Image src={trash} alt="title-menu" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
