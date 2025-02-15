"use client";

import { useCallback, useEffect, useState } from "react";
import { MovieListGenres } from "../../types/HomeTypes";
import { getMediaData } from "@/api/requests";
import MoviesContainer from "@/components/MoviesContainer/MoviesContainer";

export default function Movies() {
  const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
  const [selected, setSelected] = useState<number>(28);

  const getMovieGenres = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/genre/movie/list?include_adult=false&language=en`,
    );
    if (data) setGenres(data.genres);
  }, []);

  useEffect(() => {
    getMovieGenres();
  }, [getMovieGenres]);

  return (
    <>
      <div className="content-root">
        <div className="content-parent">
          <h3 className="content-heading">Movies</h3>
          <select
            name="Sort by Genre"
            aria-label="Sort by genre"
            onChange={(e) => setSelected(Number(e.target.value))}
            className="content-dropdown"
          >
            {genres?.map((genre) => (
              <option
                key={genre.id}
                value={genre.id}
                className="content-dropdown-option"
              >
                {genre.name}
              </option>
            ))}
          </select>
        </div>
        <MoviesContainer selection={selected} />
      </div>
    </>
  );
}
