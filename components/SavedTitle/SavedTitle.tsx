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
      <div className="relative mx-auto flex h-[300px] w-[147px] flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl">
        <Image
          src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
          alt="image-cover"
          width={147}
          height={221}
          priority
          loading="eager"
          onClick={() => navigateToShow(type, id)}
          className="mx-auto h-[221px] w-[147px] cursor-pointer rounded-lg transition-transform duration-100 ease-in hover:scale-95 md:h-auto md:w-auto"
        />
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
            window.location.reload();
          }}
          className="absolute right-1 top-1 rounded-xl rounded-bl-xl border-none bg-neutral-800 p-1 outline-none"
        >
          <Image src={unSaveIcon} alt="unsave" className="h-5 w-5" />
        </button>
        <div className="mt-1 flex h-auto w-full flex-col items-start justify-center space-y-0.5">
          <p className="line-clamp-1 text-ellipsis whitespace-nowrap text-left text-xs font-semibold text-white">
            {title}
          </p>
          <h4 className="mr-1 text-xs font-normal text-neutral-400">
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
