"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { MovieListGenres } from "../../types/HomeTypes";
import MovieShowFallback from "./loading";
import { getMediaData } from "@/api/requests";
import MoviesContainer from "@/components/MoviesContainer/MoviesContainer";

export default function Movies() {
  const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
  const [selected, setSelected] = useState<number>(28);

  const getMovieGenres = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    );
    if (data) setGenres(data.genres);
  }, []);

  useEffect(() => {
    getMovieGenres();
  }, [getMovieGenres]);

  return (
    <>
      <div className="max-h-auto -mt-2 h-full max-h-max w-full bg-neutral-900 px-5 pb-2 text-left md:px-6">
        <div className="my-4 flex h-auto w-full items-center justify-between">
          <h3 className="py-2 text-base font-bold text-white md:text-lg">
            Movies
          </h3>
          <select
            name="Sort by Genre"
            aria-label="Sort by genre"
            onChange={(e) => setSelected(Number(e.target.value))}
            className="none h-8 w-32 rounded-md border-none bg-neutral-900 text-xs font-semibold text-white outline-none"
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
          <MoviesContainer selection={selected} />
        </Suspense>
      </div>
    </>
  );
}
