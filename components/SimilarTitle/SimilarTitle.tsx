import { TVDiscover } from "@/types/HomeTypes";
import Image from "next/image";
import Link from "next/link";

export default function SimilarTitle({
  name,
  id,
  title,
  poster_path,
  isShow,
  vote_average,
}: TVDiscover) {
  return (
    <>
      <Link
        href={isShow ? `/shows/${id}` : `/movies/${id}`}
        className="h-auto w-[154px] flex-shrink-0"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
          alt="poster"
          width={154}
          height={231}
          className="h-[231px] w-[154px] rounded-xl transition-all ease-in hover:scale-95"
        />
        <div className="mt-1 flex h-12 w-full flex-col items-start justify-start">
          <p className="w-full overflow-x-hidden whitespace-nowrap text-left text-xs font-semibold text-white">
            {name || title}
          </p>
          <h4 className="h-6 w-full text-left text-xs font-semibold text-gray-400">
            Rating: {vote_average ? `${vote_average.toFixed(1)}` : "NA"}
          </h4>
        </div>
      </Link>
    </>
  );
}
