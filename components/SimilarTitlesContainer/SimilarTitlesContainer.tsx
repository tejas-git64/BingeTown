import { getMediaData } from "@/api/requests";
import React from "react";
import SimilarTitle from "../SimilarTitle/SimilarTitle";
import { TVDiscover } from "@/types/HomeTypes";
import { v4 as uuidv4 } from "uuid";

export default async function SimilarTitlesContainer({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  const similarMovies = await getMediaData(
    `https://api.themoviedb.org/3/${type}/${id}/similar`,
  );

  return (
    <>
      {similarMovies.results?.length > 0 ? (
        <div className="4xl:max-w-[18%] mx-auto h-72 w-full flex-shrink-0 pb-9 md:h-80 md:px-2 lg:px-4 lg:pl-2 xl:ml-2 xl:mt-1.5 xl:block xl:h-[800px] xl:max-w-[340px] xl:px-2 2xl:h-[50vw] 2xl:max-h-[1150px]">
          <p className="text-left text-sm font-semibold text-white">
            Similar Titles
          </p>
          <div
            id="similar"
            className="mt-2 flex h-auto place-items-end overflow-x-scroll xl:grid xl:h-full xl:overflow-hidden xl:overflow-y-scroll xl:pt-6"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
              gridTemplateRows: "repeat(auto-fill, minmax(260px, 1fr))",
              rowGap: "20px",
              columnGap: "10px",
            }}
          >
            {similarMovies.results.map((movie: TVDiscover) => (
              <SimilarTitle key={uuidv4()} {...movie} isShow={false} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
