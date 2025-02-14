"use client";

import { GenreType, Movie } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import MovieTitle from "../MovieTitle/MovieTitle";
import { getMediaData } from "@/api/requests";
// import { observerOptions } from "@/api/options";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";
import SectionFallback from "../Fallback/Section/SectionFallback";

const GenresSection = ({ id, heading }: GenreType) => {
  const [genreMovies, setGenreMovies] = useState<Movie[] | null>(null);
  const { push } = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "20px",
    initialInView: false,
  });

  const fetchGenreData = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
    );
    if (data) setGenreMovies(data.results);
  }, [id]);

  useEffect(() => {
    if (inView && !genreMovies) fetchGenreData();
  }, [fetchGenreData, genreMovies, inView]);

  return (
    <>
      <section ref={ref} className="mx-auto my-2 h-auto w-full md:h-auto">
        <h2
          onClick={() => push("/movies")}
          className="mx-auto w-full cursor-pointer text-left text-base font-medium text-white"
        >
          {heading}
        </h2>

        <div
          id="genre"
          className="mx-auto flex h-[310px] flex-shrink-0 overflow-y-hidden overflow-x-scroll pt-2 md:h-max"
        >
          {genreMovies ? (
            genreMovies?.map((movie: Movie) => (
              <div key={uuidv4()} className="mr-2 md:mr-4">
                <MovieTitle {...movie} key={movie.id} />
              </div>
            ))
          ) : (
            <SectionFallback />
          )}
        </div>
      </section>
    </>
  );
};

export default GenresSection;
