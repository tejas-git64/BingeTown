"use client";

import { GenreType, Movie } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import MovieTitle from "../MovieTitle/MovieTitle";
import Loading from "../MovieSection/loading";
import { getMediaData } from "@/api/requests";
import { introptions } from "@/api/options";
import { v4 as uuidv4 } from "uuid";

// const isSameGenre = (prevProps: GenreType, nextProps: GenreType) => {
// 	return prevProps.id === nextProps.id;
// };

const GenresSection = ({ id, heading }: GenreType) => {
  const [genreMovies, setGenreMovies] = useState<Movie[] | null>(null);
  const { push } = useRouter();
  const sectionRef = useRef(null);

  const fetchGenreData = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
    );
    if (data) setGenreMovies(data.results);
  }, [id]);

  useEffect(() => {
    const titleObserver = new IntersectionObserver((enteries) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting && genreMovies === null) fetchGenreData();
      });
    }, introptions);
    if (sectionRef.current) {
      titleObserver.observe(sectionRef.current);
    }
    return () => {
      titleObserver.disconnect();
    };
  }, [fetchGenreData, genreMovies]);

  return (
    <>
      <section
        ref={sectionRef}
        className="titles mx-auto my-4 h-auto w-full md:h-auto"
      >
        <h2
          onClick={() => push("/movies")}
          className="mx-auto w-full cursor-pointer text-left text-lg font-extrabold text-white"
        >
          {heading}
        </h2>
        <Suspense fallback={<Loading key={heading} />}>
          <div
            id="genre"
            className="mx-auto flex h-[310px] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto"
          >
            {genreMovies?.map((movie: Movie) => (
              <div key={uuidv4()} className="mr-2 sm:mr-4">
                <MovieTitle {...movie} key={movie.id} />
              </div>
            ))}
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default GenresSection;
