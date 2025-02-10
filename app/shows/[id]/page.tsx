import { Suspense } from "react";
import DetailsPageFallback from "@/app/movies/[id]/loading";
import { getMediaData } from "@/api/requests";
import RecommendationContainer from "@/components/RecommendationContainer/RecommendationContainer";
import Title from "@/components/Title/Title";
import SimilarTitlesContainer from "@/components/SimilarTitlesContainer/SimilarTitlesContainer";

export default async function TVShowTitleDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const data = await getMediaData(
    `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos`,
  );

  return (
    <>
      <div className="h-auto w-full bg-neutral-900">
        <Suspense fallback={<DetailsPageFallback />}>
          <div className="mx-auto flex h-auto flex-col overflow-hidden px-4 pb-10 pt-2 md:mb-0 md:h-auto md:justify-around md:px-0 md:pb-8 lg:px-5 xl:w-full xl:flex-row xl:px-2">
            <RecommendationContainer id={id} type="show" />
            {data ? (
              <Title
                id={id}
                titleInfo={data}
                initKey={data?.videos.results[0]?.key}
              />
            ) : null}
            <SimilarTitlesContainer id={id} type="show" />
          </div>
        </Suspense>
      </div>
    </>
  );
}
