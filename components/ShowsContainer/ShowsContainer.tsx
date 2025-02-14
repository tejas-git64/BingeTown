"use client";

import { observerOptions } from "@/api/options";
import { getMediaData } from "@/api/requests";
import { TVDiscover, TVList } from "@/types/HomeTypes";
import React, {
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";
import TVTitle from "../TVTitle/TVTitle";
import MovieShowFallback from "@/app/movies/loading";

const ShowsContainer = memo(({ selection }: { selection: number }) => {
  const [sortedShows, setSortedShows] = useState<TVList["shows"]>([]);
  const currentGenre = useRef(selection);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView({
    triggerOnce: page === 499 ? true : false,
    ...observerOptions,
  });

  const getShowsData = useCallback(async () => {
    if (page <= 500) {
      if (currentGenre.current === selection) {
        const data = await getMediaData(
          `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=${currentGenre.current}&page=${page}`,
        );
        if (data) setSortedShows((prev) => [...prev, ...data.results]);
      } else {
        currentGenre.current = selection;
        setPage(1);
        const data = await getMediaData(
          `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=${selection}&page=${page}`,
        );
        if (data) setSortedShows(data.results);
      }
    }
  }, [page, selection]);

  useEffect(() => {
    if (inView) setPage((prev) => prev + 1);
  }, [inView]);

  useEffect(() => {
    getShowsData();
  }, [getShowsData]);

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
          {sortedShows.map((show: TVDiscover) => (
            <TVTitle key={uuidv4()} {...show} isShow={true} />
          ))}
        </div>
        <div ref={ref} className="h-10 w-full bg-transparent xl:h-14">
          {page === 500 && (
            <p className="text-white">You have reached the end</p>
          )}
        </div>
      </Suspense>
    </>
  );
});

ShowsContainer.displayName = "Shows Container";
export default ShowsContainer;
