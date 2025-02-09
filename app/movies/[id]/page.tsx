"use client";
/* eslint-disable react/display-name */
import { Suspense, memo, useEffect, useState } from "react";
import { Cast, CastTotal, MovieTitleInfo, ReviewsTotal } from "./TitleTypes";
import { Movie, SimilarMovies } from "@/types/HomeTypes";
import playIcon from "@/public/images/icons8-play-30.png";
import DetailsPageFallback from "./loading";
import Review from "@/components/Review/Review";
import Recommendation from "@/components/Recommendation/Recommendation";
import SimilarTitle from "@/components/SimilarTitle/SimilarTitle";
import { CastMember } from "@/components/CastMember/CastMember";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function MovieTitleDetails() {
  const [titleInfo, setTitleInfo] = useState<MovieTitleInfo | null>(null);
  const [vidID, setVidID] = useState<string | undefined>(undefined);
  const { titleId }: { titleId: string } = useParams();
  const controller = new AbortController();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_READ_ACCESS_KEY as string,
    },
  };

  async function getTitleData() {
    //Fetch if movie
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${titleId}?append_to_response=videos`,
      options,
    );
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    data ? setTitleInfo(data) : null;
  }

  useEffect(() => {
    getTitleData();
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleId]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    titleInfo?.videos?.results && setVidID(titleInfo.videos.results[0]?.key);
  }, [titleInfo?.videos.results]);

  const RecommendationCompoonent = memo(
    ({ id }: { id: string | undefined }) => {
      const [movieRecommendations, setMovieRecommendations] = useState<
        Movie[] | null
      >(null);
      async function getMovieRecommendations() {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${titleId}/recommendations`,
          options,
        );
        const data = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        data ? setMovieRecommendations(data.results) : null;
      }
      useEffect(() => {
        getMovieRecommendations();
      }, [id]);
      return (
        <div className="mx-auto hidden h-64 w-full px-4 lg:h-[1100px] xl:block xl:w-[500px]">
          <p className="my-2 text-left text-sm text-white">Recommendations</p>
          <ul className="h-full w-full overflow-y-scroll pr-3">
            {movieRecommendations?.map((recom) => (
              <div key={recom.id}>
                <Recommendation
                  name={""}
                  origin_country={[]}
                  original_name={""}
                  show_vote_average={""}
                  {...recom}
                  isShow={false}
                />
              </div>
            ))}
          </ul>
        </div>
      );
    },
  );

  const SimilarTitlesComponent = memo(({ id }: { id: string | undefined }) => {
    const [similarMovies, setSimilarMovies] = useState<SimilarMovies | null>(
      null,
    );
    async function getSimilarMovies() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${titleId}/similar`,
        options,
      );
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data ? setSimilarMovies(data) : null;
    }
    useEffect(() => {
      getSimilarMovies();
    }, [id]);
    return (
      <div className="h-84 mx-auto w-full pb-4 xl:h-[1100px] xl:w-[500px] xl:px-4">
        <p className="text-left text-sm text-white sm:text-right md:my-2">
          Similar Titles
        </p>
        <ul
          id="similar"
          className="flex h-[300px] place-items-end overflow-x-scroll pt-[23px] lg:grid xl:h-full xl:overflow-hidden xl:overflow-y-scroll"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
            gridTemplateRows: "repeat(auto-fill, minmax(260px, 1fr))",
            rowGap: "15px",
            columnGap: "10px",
          }}
        >
          {similarMovies?.results.map((movie) => (
            <SimilarTitle
              first_air_date={""}
              name={""}
              origin_country={[]}
              original_name={""}
              show_vote_average={""}
              key={movie.id}
              {...movie}
              isShow={false}
            />
          ))}
        </ul>
      </div>
    );
  });

  const MovieComponent = memo(({ id }: { id: string | undefined }) => {
    const [movieReviews, setMovieReviews] = useState<ReviewsTotal | null>(null);
    const [showComments, setShowComments] = useState(true);
    const [movieCast, setMovieCast] = useState<CastTotal | null>(null);

    async function getTitleReviews() {
      //Fetch if movie
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${titleId}/reviews`,
        options,
      );
      const data = await res.json();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      data ? setMovieReviews(data) : null;
    }

    async function getMovieCast() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${titleId}/credits?language=en-US`,
        options,
      );
      const data = await res.json();
      data.cast.filter((cast: Cast) => cast.known_for_department === "Acting");
      setMovieCast(data);
    }

    useEffect(() => {
      getTitleReviews();
      getMovieCast();
    }, [id]);
    return (
      <div className="3xl:w-full mb-2 flex h-auto w-full flex-col xl:w-[900px] 2xl:w-[1100px]">
        <p className="my-1 w-full text-left text-base text-white md:text-lg xl:w-full">
          {titleInfo?.title}
        </p>
        <iframe
          className="mx-auto h-60 w-full rounded-xl sm:h-80 md:h-96 lg:h-[550px] lg:w-full xl:w-[900px] 2xl:w-full"
          src={`https://www.youtube.com/embed/${vidID}` || ""}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        <div className="mx-auto h-auto w-full">
          <div
            id="videos"
            className="mt-2 flex h-32 w-full items-center justify-start overflow-x-scroll md:h-40"
          >
            {titleInfo?.videos?.results ? (
              titleInfo.videos.results.map((video) => (
                <div key={video.id}>
                  <div className="relative mr-2 h-auto w-40 flex-shrink-0 md:w-52">
                    <Image
                      src={`https://img.youtube.com/vi/${video.key}/default.jpg`}
                      alt="YouTube video thumbnail"
                      width={208}
                      height={144}
                      className="h-28 w-full rounded-lg md:h-36"
                    />
                    <button
                      onClick={() => setVidID(video.key)}
                      className="absolute left-[37%] top-[30%] h-auto w-auto bg-gray-800 p-2 md:left-[40%] md:top-[35%]"
                    >
                      <Image src={playIcon} alt="play" className="w-6" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>This title has no videos</p>
            )}
          </div>

          <div
            id="genres"
            className="mx-auto my-2.5 flex w-full items-center xl:w-full"
          >
            <p className="mr-2 pb-[3px] pl-0 text-xs text-gray-500 md:text-sm">
              Genres:{" "}
            </p>
            <ul id="genres" className="flex overflow-x-scroll">
              {titleInfo?.genres?.map((genre) => (
                <div
                  key={genre.id}
                  className="mr-1 whitespace-nowrap pr-1 text-xs font-semibold text-gray-300 md:pr-2 md:text-sm"
                >
                  {genre.name}
                </div>
              ))}
            </ul>
          </div>
          <div className="mx-auto mb-2 w-full text-left text-white xl:w-full">
            <div className="-mt-2 mb-2 flex w-full items-center justify-center">
              <p className="mr-2 mt-0.5 whitespace-nowrap text-xs text-gray-500 md:text-sm">
                Release year:
              </p>
              <h3 className="mt-0.5 w-full text-left text-xs font-bold text-gray-300 md:text-sm">
                {new Date(String(titleInfo?.release_date)).getFullYear()}
              </h3>
            </div>
            <h3 className="mb-0.5 mt-2.5 text-xs font-bold text-white md:text-sm">
              Summary
            </h3>
            <h3 className="w-full text-justify text-xs text-gray-500">
              {titleInfo?.overview}
            </h3>
          </div>
        </div>
        <h4 className="mb-2 text-left text-xs font-bold text-white md:text-sm">
          Cast members
        </h4>
        <ul id="cast" className="mb-2 flex h-auto w-full overflow-x-scroll">
          {movieCast?.cast?.map((member) => (
            <div key={member.id}>
              <CastMember {...member} order={0} />
            </div>
          ))}
        </ul>
        <div className="mb-2 h-auto w-full">
          <div className="my-2 flex w-full items-center justify-between">
            <p className="text-left text-sm text-white">Reviews</p>
            <button
              style={{
                border: "none",
                outline: "none",
              }}
              onClick={() => setShowComments((prev) => !prev)}
              className="bg-transparent px-0 py-1 text-xs text-gray-400"
            >
              {showComments ? "Hide comments" : "Show comments"}
            </button>
          </div>
          <ul
            className={`${
              showComments ? "flex" : "hidden"
            } h-auto w-full list-none flex-col items-center`}
          >
            {movieReviews?.results?.map((review) => (
              <Review
                name={""}
                username={""}
                avatar_path={""}
                rating={null}
                key={review.id}
                {...review}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  });

  const DetailsComponent = () => {
    return (
      <div className="mx-auto mt-12 flex h-auto flex-col overflow-x-hidden px-[20px] pt-2 md:mt-[52px] md:h-auto md:pb-4 xl:w-full xl:flex-row xl:px-6">
        <RecommendationCompoonent id={titleId} />
        <MovieComponent id={titleId} />
        <SimilarTitlesComponent id={titleId} />
      </div>
    );
  };

  const DataComponent = () => {
    if (!titleInfo) {
      throw new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 0);
      });
    } else {
      return <DetailsComponent />;
    }
  };

  return (
    <>
      <div className="h-auto w-full bg-neutral-900">
        <Suspense fallback={<DetailsPageFallback />}>
          <DataComponent />
        </Suspense>
      </div>
    </>
  );
}
