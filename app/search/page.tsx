"use client";

import { useCallback, useDeferredValue, useEffect, useState } from "react";
import { MultiSearch } from "../../types/Search";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getMediaData } from "@/api/requests";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchVal = useDeferredValue(searchQuery);
  const { push } = useRouter();
  const [searchResults, setSearchResults] = useState<MultiSearch | null>(null);

  function showDetails(mediaType: string, id: number) {
    if (mediaType === "tv") push(`/shows/${id}`);
    else push(`/movies/${id}`);
    setSearchQuery("");
  }

  const getSearchResults = useCallback(async () => {
    if (searchVal.trim() === "") {
      setSearchResults(null);
    } else {
      const data = await getMediaData(
        `https://api.themoviedb.org/3/search/multi?query=${searchVal}&include_adult=false&language=en-US&page=1`,
      );
      const min: MultiSearch = data.results.filter(
        (res: { media_type: string }) => res.media_type !== "person",
      );
      setSearchResults(min.slice(0, 6));
    }
  }, [searchVal]);

  useEffect(() => {
    if (searchVal) {
      getSearchResults();
    }
  }, [getSearchResults, searchVal]);

  return (
    <>
      <div className="flex h-[100dvh] max-h-[1000px] w-full flex-col items-center justify-start bg-neutral-900 pt-20">
        <input
          type="search"
          name="search-bar"
          value={searchVal}
          autoFocus
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for Movies or TV shows"
          className="w-[92%] rounded-md border-neutral-800 bg-neutral-800 px-5 py-3 text-base font-semibold text-white outline-none transition-colors placeholder:text-neutral-400 focus:border-teal-500 md:px-10 md:py-4 lg:w-[900px] lg:text-lg"
        />
        {searchResults ? (
          <ul className="mt-2 flex h-auto w-[92.5%] flex-col items-end justify-start space-y-2 overflow-y-scroll rounded-lg bg-neutral-950 py-2 pl-2 pr-0.5 lg:w-[1000px]">
            {searchResults.map((result) => (
              <div
                key={result.id}
                onClick={() => showDetails(result.media_type, result.id)}
                className="mx-auto flex h-14 w-full items-center justify-between rounded-md bg-neutral-800 py-2 hover:cursor-pointer hover:bg-gray-800"
              >
                <div className="flex w-auto items-center justify-start overflow-x-hidden whitespace-nowrap">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300/${result.backdrop_path}`}
                    alt="search-Image"
                    width={96}
                    height={54}
                    quality={100}
                    className="mr-4 h-[54px] w-24 rounded-lg text-xs"
                  />
                  <div className="flex h-auto w-auto flex-col items-start justify-center">
                    <h3 className="w-52 text-left text-xs font-semibold text-white sm:w-full sm:text-sm">
                      {result.title || "Unknown title"}
                    </h3>
                    <div className="flex w-auto items-center justify-start">
                      <h4 className="mr-4 text-[10.5px] font-semibold text-gray-400 sm:text-xs">
                        Rating: {result.vote_average.toFixed(2)}
                      </h4>
                      <h4 className="text-xs font-semibold text-gray-400">
                        {result.release_date}
                      </h4>
                    </div>
                  </div>
                </div>
                <p
                  className={`${
                    result.media_type === "tv"
                      ? "text-fuchsia-500"
                      : "text-yellow-400"
                  } py-2 pr-4 text-sm uppercase sm:text-base`}
                >
                  {result.media_type}
                </p>
              </div>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
