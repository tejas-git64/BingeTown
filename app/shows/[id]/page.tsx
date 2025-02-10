/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Suspense, memo } from "react";
import { TrendingTV } from "../../../types/HomeTypes";
import playIcon from "../../assets/images/icons8-play-30.png";
import DetailsPageFallback from "@/app/movies/[id]/loading";
import {
  TVTitleInfo,
  ReviewsTotal,
  CastTotal,
  Cast,
} from "@/app/movies/[id]/TitleTypes";
import { useParams } from "next/navigation";
import Review from "@/components/Review/Review";
import Recommendation from "../../../components/Recommendation/Recommendation";
import SimilarTitle from "@/components/SimilarTitle/SimilarTitle";
import Season from "../../../components/Season/Season";
import { CastMember } from "@/components/CastMember/CastMember";
import Image from "next/image";

export default function TVShowTitleDetails() {
  const [titleInfo, setTitleInfo] = useState<TVTitleInfo | null>(null);
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

  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, [titleId]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    titleInfo?.videos?.results && setVidID(titleInfo.videos.results[0]?.key);
  }, [titleInfo?.videos.results]);

  function fetchFact() {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 100);
    });
  }

  async function getTitleData() {
    //Fetch if movie
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${titleId}?append_to_response=videos`,
      options,
    );
    const data = await res.json();
    setTitleInfo(data || null);
  }

  useEffect(() => {
    getTitleData();
  }, [titleId]);

  // eslint-disable-next-line react/display-name
  const RecommendationComponent = memo(({ id }: { id: string | undefined }) => {
    const [tvRecommendations, setTvRecommendations] =
      useState<TrendingTV | null>(null);
    async function getTitleRecommendations() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations`,
        options,
      );
      const data = await res.json();
      setTvRecommendations(data || null);
    }
    useEffect(() => {
      getTitleRecommendations();
    }, [id]);
    return (
      <div className="mx-auto hidden h-64 w-full px-4 lg:h-[1100px] xl:block xl:w-[500px]">
        <p className="my-2 text-left text-sm text-white">Recommendations</p>
        <ul className="h-full overflow-y-scroll pr-3">
          {tvRecommendations?.results?.map((recom) => (
            <div key={recom.id}>
              <Recommendation
                title={""}
                show_vote_average={""}
                {...recom}
                isShow={true}
              />
            </div>
          ))}
        </ul>
      </div>
    );
  });
  // eslint-disable-next-line react/display-name
  const SimilarTitlesComponent = memo(({ id }: { id: string | undefined }) => {
    const [similarShows, setSimilarShows] = useState<TrendingTV | null>(null);
    async function getSimilarTitles() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/similar`,
        options,
      );
      const data = await res.json();
      setSimilarShows(data || null);
    }
    useEffect(() => {
      getSimilarTitles();
    }, [id]);
    return (
      <div className="h-84 mx-auto w-full pb-4 xl:h-[1100px] xl:w-[500px] xl:px-4">
        <p className="text-left text-sm text-white md:my-2 md:text-right">
          Similar Titles
        </p>
        <ul
          id="similar"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
            gridTemplateRows: "repeat(auto-fill, minmax(260px, 1fr))",
            rowGap: "15px",
            columnGap: "10px",
          }}
          className={`flex ${
            similarShows && similarShows.results.length > 0
              ? "h-[300px]"
              : "h-auto"
          } place-items-end overflow-x-scroll pt-[23px] lg:grid xl:h-full xl:overflow-hidden xl:overflow-y-scroll`}
        >
          {similarShows?.results?.map((show) => (
            <SimilarTitle
              title={""}
              show_vote_average={""}
              key={show.id}
              {...show}
              isShow={true}
            />
          ))}
        </ul>
      </div>
    );
  });

  // eslint-disable-next-line react/display-name
  const ShowComponent = memo(({ id }: { id: string | undefined }) => {
    const [showReviews, setShowReviews] = useState<ReviewsTotal | null>(null);
    const [showComments, setShowComments] = useState(false);
    const [showCast, setShowCast] = useState<CastTotal | null>(null);

    async function getTitleReviews() {
      //Fetch if movie
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/reviews`,
        options,
      );
      const data = await res.json();
      setShowReviews(data || null);
    }
    async function getShowCast() {
      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`,
        options,
      );
      const data = await res.json();
      data.cast.filter((cast: Cast) => cast.known_for_department === "Acting");
      setShowCast(data || null);
    }

    useEffect(() => {
      getTitleReviews();
      getShowCast();
    }, [id]);

    return (
      <div className="3xl:w-full mb-2 flex h-auto w-full flex-col xl:w-[900px] 2xl:w-[1100px]">
        <p className="my-1 w-full text-left text-sm text-white md:text-base xl:w-full">
          {titleInfo?.name}
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
            className="flex h-24 w-full items-center justify-start overflow-x-scroll md:h-40"
          >
            {titleInfo?.videos?.results ? (
              titleInfo.videos.results.map((video) => (
                <div key={video.id}>
                  <div className="relative mr-2 h-auto w-40 flex-shrink-0 md:w-52">
                    <Image
                      src={`http://img.youtube.com/vi/${video.key}/default.jpg`}
                      alt="YouTube video thumbnail"
                      className="h-full w-full rounded-lg"
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
          <ul className="mx-auto my-2.5 flex w-full items-center xl:w-full">
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
          </ul>
          <div className="mx-auto mb-2 w-full text-left text-white xl:w-full">
            <div className="-mt-2 mb-2 flex w-full items-center justify-center">
              <p className="mr-2 mt-0.5 whitespace-nowrap text-xs text-gray-500 md:text-sm">
                Release date:
              </p>
              <h3 className="mt-0.5 w-full text-left text-xs font-bold text-gray-300 md:text-sm">
                {titleInfo?.first_air_date}
              </h3>
            </div>
            <h3 className="mb-0.5 mt-2.5 text-xs font-bold text-white md:text-sm">
              Summary
            </h3>
            <h3 className="w-full text-justify text-xs text-gray-500">
              {titleInfo?.overview}
            </h3>
          </div>
          <p className="mb-2 w-full text-left text-xs text-white xl:text-sm">
            Seasons
          </p>
          <div
            id="seasons"
            className="flex h-auto w-full items-center justify-start overflow-x-scroll pb-4"
          >
            {titleInfo?.seasons ? (
              titleInfo.seasons.map((series) => (
                <div key={series.id}>
                  <Season
                    key={series.id}
                    poster_path={series.poster_path}
                    name={series.name}
                    episode_count={series.episode_count}
                    id={0}
                  />
                </div>
              ))
            ) : (
              <p>This series has no upcoming seasons</p>
            )}
          </div>
        </div>
        <h4 className="mb-2 text-left text-xs font-bold text-white md:text-sm">
          Cast members
        </h4>
        <ul id="cast" className="mb-2 flex h-auto w-full overflow-x-scroll">
          {showCast?.cast?.map((member) => (
            <div key={member.id}>
              <CastMember {...member} order={0} />
            </div>
          ))}
        </ul>
        <div className="h-auto w-full">
          <div className="my-2 flex w-full items-center justify-between">
            <p className="text-left text-sm text-white">Reviews</p>
            <button
              style={{
                border: "none",
                outline: "none",
              }}
              onClick={() => setShowComments(!showComments)}
              className="bg-transparent px-0 py-1 text-xs text-gray-400"
            >
              {showComments ? "Hide Comments" : "Show Comments"}
            </button>
          </div>
          <ul
            className={`${
              showComments ? "flex" : "hidden"
            } w-full list-none flex-col items-center`}
          >
            {showReviews?.results ? (
              showReviews.results.map((review) => (
                <Review
                  name={""}
                  username={""}
                  avatar_path={""}
                  rating={null}
                  key={review.id}
                  {...review}
                />
              ))
            ) : (
              <p>No Comments</p>
            )}
          </ul>
        </div>
      </div>
    );
  });

  const DetailsComponent = () => {
    return (
      <div className="mx-auto mt-12 flex h-auto flex-col overflow-x-hidden px-[20px] pt-2 md:mt-[54px] md:h-auto md:pb-4 xl:w-full xl:flex-row xl:px-6">
        <RecommendationComponent id={titleId} />
        <ShowComponent id={titleId} />
        <SimilarTitlesComponent id={titleId} />
      </div>
    );
  };

  const DataComponent = () => {
    if (!titleInfo) {
      throw fetchFact();
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
