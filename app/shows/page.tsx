"use client";

import { useState, useEffect, useCallback } from "react";
import { MovieListGenres } from "../../types/HomeTypes";
import { getMediaData } from "@/api/requests";
import ShowsContainer from "@/components/ShowsContainer/ShowsContainer";

export default function TVShows() {
  const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
  const [selected, setSelected] = useState<number>(10759);

  const getShowGenres = useCallback(async () => {
    const data = await getMediaData(
      "https://api.themoviedb.org/3/genre/tv/list?include_adult=false&language=en",
    );
    if (data) setGenres(data.genres);
  }, []);

  useEffect(() => {
    getShowGenres();
  }, [getShowGenres]);

  return (
    <>
      <div className="content-root">
        <div className="content-parent">
          <h3 className="content-heading">TV Shows</h3>
          <select
            name="Sort by Genre"
            onChange={(e) => setSelected(Number(e.target.value))}
            aria-label="Sort by genre"
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
        <ShowsContainer selection={selected} />
      </div>
    </>
  );
}
