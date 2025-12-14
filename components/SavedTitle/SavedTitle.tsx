"use client";

import unSaveIcon from "@/public/svgs/remove-ellipse-svgrepo-com.svg";
import { SavedTitleType } from "@/types/LayoutTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { unSaveTitle } from "@/firebase/requests";
import { useEffect, useState } from "react";

export default function SavedTitle({
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
  const [imgSrc, setImgSrc] = useState("");

  function navigateToShow(type: string, id: number) {
    if (type === "tv") push(`/shows/${id}`);
    else push(`/movies/${id}`);
  }

  function deleteTitle(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    unSaveTitle({
      title,
      id,
      poster_path,
      release_date,
      type,
      vote_average,
      docRef,
    });
    setTimeout(refetch, 100);
  }

  useEffect(() => {
    setImgSrc(`https://image.tmdb.org/t/p/w154/${poster_path}`);
  }, [poster_path]);

  return (
    <div className="title-container">
      <Image
        src={imgSrc || "/public/images/image-fallback.webp"}
        alt="image-cover"
        width={154}
        height={231}
        priority
        fetchPriority="high"
        onClick={() => navigateToShow(type, id)}
        onError={() => setImgSrc("/public/images/image-fallback.webp")}
        className="title-image"
      />
      <p
        className={`title-tag ${type === "movie" ? "bg-yellow-400" : "bg-purple-400"}`}
      >
        {type === "tv" ? "TV" : "MOVIE"}
      </p>
      <button
        onClick={deleteTitle}
        className="absolute bottom-6 right-0 rounded-full border-none bg-neutral-800 p-0.5 outline-none"
      >
        <Image src={unSaveIcon} alt="unsave" className="h-5 w-5" />
      </button>
      <div className="mt-1 flex h-auto w-full flex-col items-start justify-center space-y-0.5">
        <p className="title-name">{title}</p>
        <div className="flex">
          <h4 className="title-rating">Rating</h4>
          <h4 className="rating-value">
            {vote_average === 0 ? "NA" : `${vote_average.toFixed(1)}`}
          </h4>
        </div>
        <h4 className="title-year">{year}</h4>
      </div>
    </div>
  );
}
