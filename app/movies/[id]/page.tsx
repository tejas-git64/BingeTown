import { getMediaData } from "@/api/requests";
import RecommendationContainer from "@/components/RecommendationContainer/RecommendationContainer";
import SimilarTitlesContainer from "@/components/SimilarTitlesContainer/SimilarTitlesContainer";
import Title from "@/components/Title/Title";
import { Suspense } from "react";
import DetailsPageFallback from "./loading";

export default async function MovieTitleDetails({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const data = await getMediaData(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`,
  );

  return (
    <div className="mt-14 h-full max-h-max w-full bg-neutral-900">
      <Suspense fallback={<DetailsPageFallback />}>
        <div className="flex h-auto min-h-[60dvh] flex-col overflow-hidden p-2 px-4 pb-10 md:mb-0 md:h-auto md:justify-around md:px-0 md:pb-0 lg:flex-row lg:justify-around lg:px-0 xl:w-full xl:justify-around xl:px-2 xl:pb-0 2xl:justify-center">
          <RecommendationContainer id={id} type={"movie"} />
          <div className="flex h-full w-full flex-col items-start justify-center rounded-md lg:w-[64.5%] xl:w-full xl:flex-row">
            {data ? (
              <Title
                id={id}
                titleInfo={data}
                initKey={data?.videos?.results[0]?.key}
              />
            ) : null}
            <SimilarTitlesContainer id={id} type="movie" />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
