import { getMediaData } from "@/api/requests";
import Recommendation from "../Recommendation/Recommendation";
import { TVDiscover } from "@/types/HomeTypes";
import { v4 as uuidv4 } from "uuid";

const RecommendationContainer = async ({ id }: { id: string }) => {
  const data = await getMediaData(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`,
  );
  return (
    <div className="mx-auto hidden h-64 w-full px-4 lg:h-[850px] lg:min-w-[400px] lg:max-w-[28vw] xl:block xl:w-[400px]">
      <p className="my-2 text-left text-sm font-semibold text-white">
        Recommendations
      </p>
      <ul className="h-full w-full overflow-y-scroll pr-3">
        {data.results.map((r: TVDiscover) => (
          <Recommendation key={uuidv4()} {...r} isShow={false} />
        ))}
      </ul>
    </div>
  );
};

export default RecommendationContainer;
