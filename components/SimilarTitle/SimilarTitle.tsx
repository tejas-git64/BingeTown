"use client";

import { TVDiscover } from "@/types/HomeTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SimilarTitle({
  name,
  id,
  title,
  poster_path,
  isShow,
  vote_average,
}: Readonly<TVDiscover>) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setImgSrc(`https://image.tmdb.org/t/p/w154/${poster_path}`);
  }, [poster_path]);

  return (
    <Link
      href={isShow ? `/shows/${id}` : `/movies/${id}`}
      className="h-auto w-[154px] flex-shrink-0"
    >
      <Image
        src={imgSrc || "/public/images/image-fallback.webp"}
        alt="poster"
        width={154}
        height={231}
        priority
        fetchPriority="high"
        onError={() => setImgSrc("/public/images/image-fallback.webp")}
        className="title-image"
      />
      <p className={`title-tag ${isShow ? "bg-purple-400" : "bg-yellow-400"}`}>
        {isShow ? "TV" : "MOVIE"}
      </p>
      <div className="mt-1 flex h-12 w-full flex-col items-start justify-start">
        <p className="title-name">{name || title}</p>
        <div className="flex">
          <h4 className="title-rating">Rating</h4>
          <h4 className="rating-value">
            {vote_average === 0 ? "NA" : `${vote_average.toFixed(1)}`}
          </h4>
        </div>
      </div>
    </Link>
  );
}
