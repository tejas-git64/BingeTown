"use client";

import trash from "@/public/svgs/trash-xmark-alt-svgrepo-com.svg";
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
      <div onClick={() => navigateToShow(type, id)} className="title-container">
        <Image
          src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
          alt="image-cover"
          height={231}
          width={154}
          priority
          loading="eager"
          className="title-image"
        />
        <p
          className={`title-tag ${type === "movie" ? "bg-yellow-400" : "bg-purple-400"}`}
        >
          {type === "tv" ? "TV" : "MOVIE"}
        </p>
        <h3 className="title-name">{title}</h3>
        <div className="title-parent">
          <div className="title-child-1">
            <div className="flex">
              <h4 className="title-rating">Rating:</h4>
              <h4 className="rating-value">
                {vote_average === 0 ? "NA" : `${vote_average.toFixed(1)}`}
              </h4>
            </div>
            <h3 className="title-year">{year}</h3>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeTitle({
                title,
                id,
                poster_path,
                release_date,
                type,
                vote_average,
                watched: false,
                docRef,
              });
              setTimeout(() => window.location.reload(), 500);
            }}
            className="h-auto border-none bg-transparent p-0"
          >
            <Image src={trash} alt="title-menu" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
