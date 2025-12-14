"use client";

import { observerOptions } from "@/api/options";
import { getMediaData } from "@/api/requests";
import { TVDiscover, TVList } from "@/types/HomeTypes";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";
import { v4 as uuidv4 } from "uuid";
import TVTitle from "../TVTitle/TVTitle";

const ShowsContainer = memo(({ selection }: { selection: number }) => {
  const [sortedShows, setSortedShows] = useState<TVList["shows"]>([]);
  const currentGenre = useRef<number>(10759);
  const [page, setPage] = useState<number>(1);
  const [ref, inView] = useInView({
    triggerOnce: page === 499,
    ...observerOptions,
  });
  const keyVal = useMemo(() => uuidv4(), []);
  const getShowsData = useCallback(async () => {
    if (page <= 500) {
      if (currentGenre.current === selection) {
        const data = await getMediaData(
          `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=${currentGenre.current}&page=${page}`,
        );
        if (data) setSortedShows((prev) => [...prev, ...data.results]);
      } else {
        const data = await getMediaData(
          `https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=${selection}&page=1`,
        );
        currentGenre.current = selection;
        setPage(1);
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
          gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
        className="content-container"
      >
        {sortedShows.map((show: TVDiscover) => (
          <TVTitle key={keyVal} {...show} isShow={true} />
        ))}
      </div>
      <div ref={ref} className="content-loader">
        {page === 500 && <p className="text-white">You have reached the end</p>}
      </div>
    </>
  );
});

ShowsContainer.displayName = "Shows Container";
export default ShowsContainer;
