"use client";

import { observerOptions } from "@/api/options";
import { getMediaData } from "@/api/requests";
import { Movie } from "@/types/HomeTypes";
import React, {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import MovieTitle from "../MovieTitle/MovieTitle";
import { v4 as uuidv4 } from "uuid";
import MovieShowFallback from "@/app/movies/loading";

const MoviesContainer = memo(({ selection }: { selection: number }) => {
  const [sortedMovies, setSortedMovies] = useState<Movie[]>([]);
  const currentGenre = useRef(selection);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView({
    triggerOnce: page === 499 ? true : false,
    ...observerOptions,
  });

  const getMoviesData = useCallback(async () => {
    if (page <= 500) {
      if (currentGenre.current === selection) {
        const data = await getMediaData(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${currentGenre.current}&page=${page}`,
        );
        if (data) setSortedMovies((prev) => [...prev, ...data.results]);
      } else {
        currentGenre.current = selection;
        setPage(1);
        const data = await getMediaData(
          `https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${selection}&page=${page}`,
        );
        if (data) setSortedMovies(data.results);
      }
    }
  }, [page, selection]);

  useEffect(() => {
    if (inView) setPage((prev) => prev + 1);
  }, [inView]);

  useEffect(() => {
    getMoviesData();
  }, [getMoviesData]);

  return (
    <>
      <Suspense fallback={<MovieShowFallback />}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
            gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
          className="mb-6 mt-4 h-auto min-h-[70dvh] gap-x-4 gap-y-4 scroll-smooth md:gap-x-6"
        >
          {sortedMovies?.map((movie: Movie) => (
            <MovieTitle key={uuidv4()} {...movie} />
          ))}
        </div>
        <div ref={ref} className="h-10 w-full bg-transparent">
          {page === 500 && (
            <p className="text-white">You have reached the end</p>
          )}
        </div>
      </Suspense>
    </>
  );
});

MoviesContainer.displayName = "Movies Container";
export default MoviesContainer;
