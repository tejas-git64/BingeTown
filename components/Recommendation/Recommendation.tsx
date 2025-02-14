import { TVDiscover } from "@/types/HomeTypes";
import Image from "next/image";
import Link from "next/link";

export default function Recommendation({
  backdrop_path,
  name,
  id,
  title,
  isShow,
  vote_average,
}: TVDiscover) {
  return (
    <>
      <Link
        href={isShow ? `/shows/${id}` : `/movies/${id}`}
        className="mb-1 flex h-auto w-full items-center justify-start rounded-md bg-neutral-800 hover:bg-neutral-700"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w92/${backdrop_path}`}
          alt="recommendation"
          width={92}
          height={52}
          className="mr-4 h-[52px] w-[92px] scale-100 overflow-clip rounded-md text-xs"
        />
        <div className="flex h-12 w-52 flex-col items-start justify-center overflow-x-hidden">
          <h3 className="line-clamp-1 text-ellipsis whitespace-nowrap text-xs font-semibold text-white">
            {name || title}
          </h3>
          <h4 className="whitespace-nowrap text-xs font-semibold text-neutral-400">
            Rating: {vote_average.toFixed(1)}
          </h4>
        </div>
      </Link>
    </>
  );
}
