import { ReviewType } from "@/app/movies/[id]/TitleTypes";
import Image from "next/image";

export default function Review({
  author,
  content,
  updated_at,
  username,
  avatar_path,
  rating,
}: ReviewType) {
  return (
    <>
      <div className="mb-2 flex h-auto w-full flex-col rounded-md border border-neutral-800 bg-neutral-800 p-2">
        <div className="flex w-full items-center">
          <Image
            src={
              avatar_path
                ? `https://image.tmdb.org/t/p/original/${avatar_path}`
                : `https://api.dicebear.com/6.x/avataaars/svg?seed=${author}`
            }
            alt="user-img"
            width={40}
            height={40}
            className="mr-1 h-[40px] w-[40px] rounded-full bg-neutral-900 text-xs"
          />
          <div className="flex w-full items-center justify-between">
            <div className="flex w-44 flex-col items-start justify-center whitespace-nowrap pl-2">
              <h3 className="whitespace-nowraps mr-2 line-clamp-1 text-ellipsis text-sm font-semibold text-teal-500">
                {author || "Unknown"}
              </h3>
              <h4 className="mr-4 text-ellipsis text-xs text-neutral-400">
                @{username || "unknown"}
              </h4>
            </div>
            <div>
              <h4 className="-ml-2 mb-0.5 text-right text-xs font-medium text-neutral-200">
                Rating: {rating ? `${rating}` : "NA"}
              </h4>
              <p className="whitespace-nowrap text-xs font-semibold text-neutral-500">
                {updated_at.split("").splice(0, 10)}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-2 flex h-full w-full flex-col items-start justify-start">
          <p className="h-auto w-full text-justify text-xs font-medium text-neutral-400">
            {content}
          </p>
        </div>
      </div>
    </>
  );
}
