import { getMediaData } from "@/api/requests";
import React from "react";
import SimilarTitle from "../SimilarTitle/SimilarTitle";
import { TVDiscover } from "@/types/HomeTypes";
import { v4 as uuidv4 } from "uuid";

export default async function SimilarTitlesContainer({ id }: { id: string }) {
  const similarMovies = await getMediaData(
    `https://api.themoviedb.org/3/movie/${id}/similar`,
  );

  return (
    <>
      {similarMovies.results.length > 0 ? (
        <div className="mx-auto h-72 w-full flex-shrink-0 pb-10 md:h-80 md:px-4 lg:px-0 xl:h-[890px] xl:max-w-[360px] xl:px-4 2xl:pl-2">
          <p className="text-left text-sm font-semibold text-white md:my-2 xl:pl-2">
            Similar Titles
          </p>
          <ul
            id="similar"
            className="flex h-[300px] place-items-end overflow-x-scroll pt-[23px] xl:grid xl:h-full xl:overflow-hidden xl:overflow-y-scroll"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
              gridTemplateRows: "repeat(auto-fill, minmax(260px, 1fr))",
              rowGap: "15px",
              columnGap: "10px",
            }}
          >
            {similarMovies.results.map((movie: TVDiscover) => (
              <SimilarTitle key={uuidv4()} {...movie} isShow={false} />
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
