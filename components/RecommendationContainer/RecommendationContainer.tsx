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
    <div className="hidden h-64 w-full px-4 md:px-0 lg:block lg:h-[680px] lg:min-w-[400px] lg:max-w-[28vw] lg:pl-4 lg:pr-0 xl:h-[850px] xl:w-[400px] xl:pr-4">
      <p className="my-2 text-left text-sm font-semibold text-white">
        Recommendations
      </p>
      <ul className="h-full w-full overflow-y-scroll pr-3">
        {data.results.map((r: TVDiscover) => (
          <Recommendation
            key={uuidv4()}
            {...r}
            isShow={type === "movie" ? false : true}
          />
        ))}
      </ul>
    </div>
  );
};

export default RecommendationContainer;
