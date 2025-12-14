import { MovieTitleInfo } from "@/app/movies/[id]/TitleTypes";
import React from "react";

export default function Genres({ titleInfo }: Readonly<{ titleInfo: MovieTitleInfo }>) {
  return (
    <div
      id="genres"
      className="text mx-auto my-2 flex w-full items-center xl:w-full"
    >
      <p className="-mt-1 mr-2 pb-[3px] pl-0 text-xs font-semibold text-neutral-400 antialiased md:text-sm">
        Genres:{" "}
      </p>
      <ul id="genres" className="-mt-0.5 flex overflow-x-scroll">
        {titleInfo?.genres?.map((genre) => (
          <div
            key={genre.id}
            className="mr-1 whitespace-nowrap pr-1 text-xs font-semibold text-gray-300 md:pr-2 md:text-sm"
          >
            {genre.name}
          </div>
        ))}
      </ul>
    </div>
  );
}
