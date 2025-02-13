"use client";

import unSaveIcon from "@/public/svgs/remove-ellipse-svgrepo-com.svg";
import { SavedTitleType } from "@/types/LayoutTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { unSaveTitle } from "@/firebase/requests";

export default function SavedTitle({
  title,
  id,
  poster_path,
  release_date,
  type,
  vote_average,
  docRef,
}: SavedTitleType) {
  const { push } = useRouter();
  const year = new Date(release_date).getFullYear();
  function navigateToShow(type: string, id: number) {
    if (type === "tv") push(`/shows/${id}`);
    else push(`/movies/${id}`);
  }

  return (
    <>
      <div className="relative mx-auto flex h-[300px] w-[154px] flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl">
        <Image
          src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
          alt="image-cover"
          width={154}
          height={231}
          priority
          loading="eager"
          onClick={() => navigateToShow(type, id)}
          className="mx-auto h-[221px] w-[154px] cursor-pointer rounded-lg object-cover transition-transform duration-100 ease-in hover:scale-95 md:h-auto md:w-auto"
        />
        <p
          className={`absolute right-1.5 top-1.5 rounded-sm ${type === "movie" ? "bg-yellow-400" : "bg-purple-400"} px-1.5 py-0.5 text-[10.5px] font-bold text-black shadow-sm shadow-black`}
        >
          {type === "tv" ? "TV" : "MOVIE"}
        </p>
        <button
          onClick={() => {
            unSaveTitle({
              title,
              id,
              poster_path,
              release_date,
              type,
              vote_average,
              docRef,
            });
            setTimeout(() => window.location.reload(), 500);
          }}
          className="absolute bottom-6 right-0 rounded-full border-none bg-neutral-800 p-0.5 outline-none"
        >
          <Image src={unSaveIcon} alt="unsave" className="h-5 w-5" />
        </button>
        <div className="mt-1 flex h-auto w-full flex-col items-start justify-center space-y-0.5">
          <p className="line-clamp-1 text-ellipsis whitespace-nowrap text-left text-xs font-semibold text-white">
            {title}
          </p>
          <h4 className="mr-1 text-xs font-normal text-[#778677]">
            Rating: {vote_average.toFixed(1)}
          </h4>
          <h4 className="whitespace-nowrap text-xs font-semibold text-neutral-300">
            {year}
          </h4>
        </div>
      </div>
    </>
  );
}
