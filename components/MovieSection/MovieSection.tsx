import { ContentType, Movie } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import MovieTitle from "../MovieTitle/MovieTitle";
import Loading from "./loading";
import { getMediaData } from "@/api/home/requests";
import { introptions } from "@/api/options";

// const isSameSection = (prevProps: ContentType, nextProps: ContentType) => {
//   return prevProps.heading === nextProps.heading;
// };

const MovieSection = ({ heading, uri }: ContentType) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const { push } = useRouter();
  const sectionRef = useRef(null);

  const fetchMoviesData = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/${uri}?language=en-US&page=1`,
    );
    if (data) setMovies(data.results);
  }, [uri]);

  useEffect(() => {
    const titleObserver = new IntersectionObserver((enteries) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting && movies === null) fetchMoviesData();
      });
    }, introptions);
    if (sectionRef.current) {
      titleObserver.observe(sectionRef.current);
    }
    return () => {
      titleObserver.disconnect();
    };
  }, [fetchMoviesData, movies]);

  return (
    <>
      <section
        id={heading}
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
            id={"latest"}
            className="mx-auto flex h-[310px] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto"
          >
            {movies?.map((movie: Movie) => (
              <div key={movie.id} className="mr-2 sm:mr-4">
                <MovieTitle key={movie.id} {...movie} />
              </div>
            ))}
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default MovieSection;
