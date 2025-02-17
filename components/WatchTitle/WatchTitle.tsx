"use client";

import trash from "@/public/svgs/trash-xmark-alt-svgrepo-com.svg";
import { SavedTitleType } from "@/types/LayoutTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { removeTitle } from "@/firebase/requests";
import { useState } from "react";

export default function WatchTitle({
  title,
  id,
  poster_path,
  release_date,
  type,
  vote_average,
  docRef,
  refetch,
}: SavedTitleType & { refetch: () => void }) {
  const { push } = useRouter();
  const year = new Date(release_date).getFullYear();
  const [imgSrc, setImgSrc] = useState(
    `https://image.tmdb.org/t/p/w154/${poster_path}`,
  );
  function navigateToShow(type: string, id: number) {
    if (type === "tv") push(`/shows/${id}`);
    else push(`/movies/${id}`);
  }

  function deleteTitle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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
    setTimeout(refetch, 100);
  }

  return (
    <>
      <div onClick={() => navigateToShow(type, id)} className="title-container">
        <Image
          src={imgSrc ? imgSrc : "/public/images/image-fallback.webp"}
          alt="image-cover"
          height={231}
          width={154}
          priority
          fetchPriority="high"
          onError={() => setImgSrc("/public/images/image-fallback.webp")}
          className="title-image"
        />
        <p
          className={`title-tag ${type === "tv" ? "bg-purple-400" : "bg-yellow-400"}`}
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
            onClick={deleteTitle}
            className="h-auto border-none bg-transparent p-0"
          >
            <Image src={trash} alt="title-menu" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
}
