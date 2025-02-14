"use client";

import { ContentType, TVDiscover } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import TVTitle from "@/components/TVTitle/TVTitle";
import { getMediaData } from "@/api/requests";
// import { observerOptions } from "@/api/options";
import { v4 as uuidv4 } from "uuid";
import { useInView } from "react-intersection-observer";
import SectionFallback from "../Fallback/Section/SectionFallback";

const TVSection = ({ heading, uri }: ContentType) => {
  const [shows, setShows] = useState<TVDiscover[] | null>(null);
  const { push } = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "20px",
    initialInView: false,
  });

  const fetchTVData = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/${uri}?language=en-US&page=1`,
    );
    if (data) setShows(data.results);
  }, [uri]);

  useEffect(() => {
    if (inView && !shows) fetchTVData();
  }, [fetchTVData, inView, shows]);

  return (
    <>
      <section ref={ref} className="mx-auto my-2 h-auto w-full md:h-auto">
        <h2
          onClick={() => push("/shows")}
          className="mx-auto w-full cursor-pointer text-left text-base font-extrabold text-white"
        >
          {heading}
        </h2>
        <div
          id="latest"
          className="mx-auto flex h-[310px] flex-shrink-0 overflow-y-hidden overflow-x-scroll pt-2 md:h-max"
        >
          {shows ? (
            shows?.map((show: TVDiscover) => (
              <div key={uuidv4()} className="mr-2 md:mr-4">
                <TVTitle {...show} />
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

export default TVSection;
