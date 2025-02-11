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
        <div className="mx-auto h-72 w-full flex-shrink-0 pb-10 md:h-80 md:px-4 lg:hidden lg:px-0 xl:block xl:h-[800px] xl:max-w-[360px] xl:px-4 2xl:pl-2">
          <p className="my-2 text-left text-sm font-semibold text-white">
            Similar Titles
          </p>
          <div
            id="similar"
            className="xl flex h-[285px] place-items-start overflow-y-hidden overflow-x-scroll rounded-md lg:overflow-x-hidden lg:overflow-y-scroll xl:grid xl:h-full 2xl:h-[47vw]"
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
