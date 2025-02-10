"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { MovieListGenres, TVDiscover, TVList } from "../../types/HomeTypes";
import MovieShowFallback from "../movies/loading";
import TVTitle from "@/components/TVTitle/TVTitle";
import { getMediaData } from "@/api/requests";

export default function TVShows() {
  const [sortedShows, setSortedShows] = useState<TVList["shows"] | null>(null);
  const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
  const [selected, setSelected] = useState<number | string>("");

  async function getShowGenres() {
    const data = await getMediaData(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
    );
    if (data) setGenres(data.genres);
  }

  const getShowsData = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=${selected}&page=1`,
    );
    setSortedShows(data.results);
  }, [selected]);

  useEffect(() => {
    getShowsData();
    getShowGenres();
  }, [getShowsData]);

  return (
    <>
      <div className="max-h-auto -mt-4 h-[100dvh] w-full bg-neutral-900 px-5 pb-2 text-left md:px-6">
        <div className="my-4 flex h-auto w-full items-center justify-between">
          <h3 className="py-2 text-base font-bold text-white md:text-lg">
            TV Shows
          </h3>
          <select
            name="Sort by Genre"
            onChange={(e) => setSelected(e.target.value)}
            aria-label="Sort by genre"
            className="mr-1 h-8 w-36 rounded-md border-none bg-neutral-900 text-xs font-semibold text-white outline-none"
          >
            {genres?.map((genre) => (
              <option
                key={genre.id}
                value={genre.id}
                className="text-white hover:bg-black hover:text-teal-400"
              >
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <Suspense fallback={<MovieShowFallback />}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
              gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
            className="mb-6 mt-4 h-auto gap-x-4 gap-y-4 md:gap-x-6"
          >
            {sortedShows?.map((show: TVDiscover) => (
              <div key={show.id} className="mx-auto w-min">
                <TVTitle {...show} isShow={true} />
              </div>
            ))}
          </div>
        </Suspense>
      </div>
    </>
  );
}
