import { MovieTitleInfo, TVTitleInfo } from "@/app/movies/[id]/TitleTypes";
import React from "react";

export default function TitleInfo({
  titleInfo,
}: {
  titleInfo: MovieTitleInfo & TVTitleInfo;
}) {
  return (
    <div className="mx-auto mb-2 w-full text-left text-white xl:w-full">
      <div className="-mt-2 mb-2 flex w-full items-center justify-center">
        <p className="mr-2 mt-0.5 whitespace-nowrap text-xs font-semibold text-neutral-400 antialiased md:text-sm">
          Release year:
        </p>
        <h3 className="mt-0.5 w-full text-left text-xs font-bold text-gray-300 md:text-sm">
          {new Date(
            String(titleInfo?.release_date || titleInfo?.first_air_date),
          ).getFullYear()}
        </h3>
      </div>
      <h3 className="mb-0.5 mt-2.5 text-xs font-semibold text-white antialiased md:text-sm">
        Summary
      </h3>
      <h3 className="w-full text-justify text-xs font-semibold text-neutral-400 antialiased md:text-sm">
        {titleInfo?.overview}
      </h3>
    </div>
  );
}
