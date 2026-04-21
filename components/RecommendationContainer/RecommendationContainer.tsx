import { getMediaData } from "@/api/requests";
import Recommendation from "../Recommendation/Recommendation";
import { TVDiscover } from "@/types/HomeTypes";
import { v4 as uuidv4 } from "uuid";

const RecommendationContainer = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const data = await getMediaData(
    `https://api.themoviedb.org/3/${type}/${id}/recommendations`,
  );
  return (
    <div className="4xl:max-w-[17%] hidden h-64 w-full overflow-hidden lg:block lg:h-[1015px] lg:min-w-[380px] lg:max-w-[28vw] lg:pl-4 xl:h-[800px] xl:w-[400px] xl:pr-4 2xl:h-[50vw] 2xl:max-w-[500px]">
      <p className="my-2 text-left text-sm font-semibold text-white">
        Recommendations
      </p>
      <ul className="h-full w-full overflow-x-hidden overflow-y-scroll rounded-lg pb-10 pr-1">
        {data.results?.map((r: TVDiscover) => (
          <Recommendation key={uuidv4()} {...r} isShow={type !== "movie"} />
        ))}
      </ul>
    </div>
  );
};

export default RecommendationContainer;
