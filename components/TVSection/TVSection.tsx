"use client";

import { ContentType, TVDiscover } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Suspense, useEffect, useRef } from "react";
import TVTitle from "@/components/TVTitle/TVTitle";
import Loading from "@/components/MovieSection/loading";
import { getMediaData } from "@/api/requests";
import { introptions } from "@/api/options";

// const isSameTVList = (prevProps: ContentType, nextProps: ContentType) => {
// 	return prevProps.heading === nextProps.heading;
// };

const TVSection = ({ heading, uri }: ContentType) => {
  const [shows, setShows] = useState<TVDiscover[] | null>(null);
  const { push } = useRouter();
  const tvSectionRef = useRef(null);
  const fetchTVData = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/${uri}?language=en-US&page=1`,
    );
    if (data) setShows(data);
  }, [uri]);

  useEffect(() => {
    const titleObserver = new IntersectionObserver((enteries) => {
      enteries.forEach((entry) => {
        if (entry.isIntersecting && shows === null) fetchTVData();
      });
    }, introptions);
    if (tvSectionRef.current) {
      titleObserver.observe(tvSectionRef.current);
    }
    return () => {
      titleObserver.disconnect();
    };
  }, [fetchTVData, shows]);

  return (
    <>
      <section
        ref={tvSectionRef}
        className="titles mx-auto my-4 h-auto w-full md:h-auto"
      >
        <h2
          onClick={() => push("/tvshows")}
          className="mx-auto w-full cursor-pointer text-left text-lg font-extrabold text-white"
        >
          {heading}
        </h2>
        <Suspense fallback={<Loading key={heading} />}>
          <div
            id="latest"
            className="mx-auto flex h-[310px] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto"
          >
            {shows &&
              shows?.map((show: TVDiscover) => (
                <div key={show.id} className="mr-2 sm:mr-4">
                  <TVTitle key={show.id} {...show} />
                </div>
              ))}
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default TVSection;
