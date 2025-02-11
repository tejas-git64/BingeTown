"use client";
import { getMediaData } from "@/api/requests";
import {
  ReviewsTotal,
  CastTotal,
  Cast,
  MovieTitleInfo,
  TVTitleInfo,
} from "@/app/movies/[id]/TitleTypes";
import React, { useCallback, useEffect, useState } from "react";
import CastContainer from "../CastContainer/CastContainer";
import Genres from "../Genres/Genres";
import ReviewContainer from "../ReviewContainer/ReviewContainer";
import TitleInfo from "../TitleInfo/TitleInfo";
import playIcon from "@/public/images/icons8-play-30.png";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

export default function Title({
  id,
  titleInfo,
  initKey,
}: {
  id: string;
  titleInfo: MovieTitleInfo & TVTitleInfo;
  initKey: string | undefined;
}) {
  const [movieReviews, setMovieReviews] = useState<ReviewsTotal | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [movieCast, setMovieCast] = useState<CastTotal | null>(null);
  const [vidID, setVidID] = useState<string | undefined>(initKey);

  const getTitleReviews = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/movie/${id}/reviews`,
    );
    if (data) setMovieReviews(data);
  }, [id]);

  const getMovieCast = useCallback(async () => {
    const data = await getMediaData(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
    );
    if (data) {
      const filtered = data.cast?.filter(
        (cast: Cast) => cast.known_for_department === "Acting",
      );
      if (filtered) setMovieCast(filtered);
    }
  }, [id]);

  useEffect(() => {
    getTitleReviews();
    getMovieCast();
  }, [getMovieCast, getTitleReviews, id]);

  return (
    <div className="3xl:w-full mb-2 flex h-auto w-full flex-col md:min-w-[40vw] md:px-4 xl:w-[45vw] xl:px-0 2xl:w-[60vw] 2xl:max-w-[90vw] 2xl:pr-4">
      <p className="text-md my-1 w-full text-left font-semibold text-white md:text-lg xl:w-full">
        {titleInfo?.title || titleInfo.name}
      </p>
      <iframe
        className="mx-auto aspect-video h-[55vw] w-full rounded-xl md:h-[60vw] lg:h-[35vw] xl:h-[28vw] xl:max-h-[70vw] xl:w-full 2xl:h-[33vw] 2xl:max-h-[1200px] 2xl:w-full"
        src={`https://www.youtube.com/embed/${vidID}` || ""}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <div className="mx-auto h-auto w-full">
        <div
          id="videos"
          className="flex h-28 w-full items-center justify-start overflow-x-scroll"
        >
          {titleInfo?.videos?.results &&
          titleInfo?.videos?.results.length > 0 ? (
            titleInfo.videos.results.map((video) => (
              <div key={uuidv4()} className="mr-3 h-auto w-auto">
                <div className="relative h-[90px] w-[120px] flex-shrink-0">
                  <Image
                    src={`https://img.youtube.com/vi/${video.key}/default.jpg`}
                    alt="YouTube video thumbnail"
                    width={120}
                    height={90}
                    className="h-[90px] w-[120px] rounded-lg"
                  />
                  <button
                    onClick={() => setVidID(video.key)}
                    className="absolute left-11 top-8 h-auto w-auto rounded-lg bg-gray-800 p-2"
                  >
                    <Image src={playIcon} alt="play" className="w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="grid h-20 w-full place-items-center rounded-lg bg-neutral-800">
              <p className="text-md font-semibold text-neutral-500">
                This title has no videos :(
              </p>
            </div>
          )}
        </div>
        {titleInfo ? <Genres key={uuidv4()} titleInfo={titleInfo} /> : null}
        {titleInfo ? <TitleInfo key={uuidv4()} titleInfo={titleInfo} /> : null}
      </div>
      {movieCast?.cast ? <CastContainer movieCast={movieCast} /> : null}
      <div className="h-auto w-full">
        <div className="my-2 flex w-full items-center justify-between">
          <p className="text-left text-sm text-white antialiased">Reviews</p>
          <button
            onClick={() => setShowComments((prev) => !prev)}
            className="border-none bg-transparent px-0 py-1 text-xs font-semibold text-neutral-300 outline-none"
          >
            {showComments ? "Hide comments" : "Show comments"}
          </button>
        </div>
        {movieReviews ? (
          <ReviewContainer
            key={uuidv4()}
            reviews={movieReviews}
            showComments={showComments}
          />
        ) : null}
      </div>
    </div>
  );
}
