"use client";
import { ContentType, Movie } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import React from "react";
import MovieTitle from "../MovieTitle/MovieTitle";
import { getMediaData } from "@/api/requests";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";
import SectionFallback from "../Fallback/Section/SectionFallback";
// import { observerOptions } from "@/api/options";

const MovieSection = ({ heading, uri }: ContentType) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const { push } = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "20px",
    initialInView: false,
  });

  const fetchMoviesData = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/${uri}?language=en-US&page=1`,
    );
    if (data) setMovies(data.results);
  }, [uri]);

  useEffect(() => {
    if (inView && !movies) fetchMoviesData();
  }, [fetchMoviesData, inView, movies]);
  return (
    <>
      <section id={heading} ref={ref} className="mx-auto my-2 h-[340px] w-full">
        <h2
          onClick={() => push("/movies")}
          className="mx-auto w-full cursor-pointer text-left text-base font-medium text-white"
        >
          {heading}
        </h2>

        <div
          id={"latest"}
          className="mx-auto flex h-[300px] flex-shrink-0 overflow-y-hidden overflow-x-scroll pt-2 md:h-max"
        >
          {movies ? (
            movies?.map((movie: Movie) => (
              <div key={uuidv4()} className="mr-2 md:mr-4">
                <MovieTitle key={movie.id} {...movie} />
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

export default MovieSection;
