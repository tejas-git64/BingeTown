import { Suspense } from "react";
import DetailsPageFallback from "./loading";
import { getMediaData } from "@/api/requests";
import RecommendationContainer from "@/components/RecommendationContainer/RecommendationContainer";
import SimilarTitlesContainer from "@/components/SimilarTitlesContainer/SimilarTitlesContainer";
import Title from "@/components/Title/Title";

export default async function MovieTitleDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const data = await getMediaData(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`,
  );

  return (
    <>
      <div className="h-full w-full bg-neutral-900">
        <Suspense fallback={<DetailsPageFallback />}>
          <div className="flex h-auto flex-col overflow-hidden px-4 pb-10 pt-2 md:mb-0 md:h-auto md:justify-around md:px-0 md:pb-8 lg:flex-row lg:justify-around lg:px-0 xl:w-full xl:justify-evenly xl:px-2">
            <RecommendationContainer id={id} type={"movie"} />
            <div className="flex h-full w-full flex-col items-start justify-center lg:w-[60vw] xl:w-full xl:flex-row">
              {data ? (
                <Title
                  id={id}
                  titleInfo={data}
                  initKey={data?.videos.results[0]?.key}
                />
              ) : null}
              <SimilarTitlesContainer id={id} type="movie" />
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
}
