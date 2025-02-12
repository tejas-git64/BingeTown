"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { MovieListGenres } from "../../types/HomeTypes";
import MovieShowFallback from "../movies/loading";
import { getMediaData } from "@/api/requests";
import ShowsContainer from "@/components/ShowsContainer/ShowsContainer";

export default function TVShows() {
  const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
  const [selected, setSelected] = useState<number>(10759);

  const getShowGenres = useCallback(async () => {
    const data = await getMediaData(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
    );
    if (data) setGenres(data.genres);
  }, []);

  useEffect(() => {
    getShowGenres();
  }, [getShowGenres]);

  return (
    <>
      <div className="-mt-4 h-full max-h-max w-full flex-shrink-0 bg-neutral-900 px-5 pb-2 text-left md:px-6">
        <div className="my-4 flex h-auto w-full items-center justify-between">
          <h3 className="py-2 text-base font-bold text-white md:text-lg">
            TV Shows
          </h3>
          <select
            name="Sort by Genre"
            onChange={(e) => setSelected(Number(e.target.value))}
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
          <ShowsContainer selection={selected} />
        </Suspense>
      </div>
    </>
  );
}
