import { Movie } from "@/types/HomeTypes";
import Image from "next/image";
import Link from "next/link";

const SlideShow = ({
  backdrop_path,
  title,
  overview,
  id,
  release_date,
}: Movie) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const date = new Date(release_date);
  return (
    <div className="relative mr-2 flex aspect-video h-[59vw] w-full flex-shrink-0 snap-center justify-center overflow-hidden rounded-2xl pl-4 pt-16 text-left transition-all sm:h-[350px] sm:pl-20 md:h-[440px] md:w-[780px] md:pl-32 xl:h-[640px] xl:w-[1280px] xl:pl-44">
      <Image
        src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
        fill
        fetchPriority="high"
        priority
        loading="eager"
        // sizes="(max-width: 768px) 300px, (max-width: 2160px) 1280px"
        quality={100}
        alt="slideshow-img"
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-start justify-center bg-gradient-to-r from-black via-[#0000006e] to-transparent pl-10 sm:pl-14 xl:pl-40">
        <p
          style={{
            textShadow: "0px 5px 10px #555",
          }}
          className="text-xl font-semibold text-white sm:text-2xl xl:text-3xl"
        >
          {title}
        </p>
        <h4 className="my-1 text-xs font-bold text-yellow-300 sm:text-sm md:my-2">
          {formatter.format(date)}
        </h4>
        <h3 className="hidden w-80 text-xs text-white sm:block md:w-[calc(100%-40%)] md:text-xs xl:w-[calc(100%-55%)] xl:text-sm">
          {overview}
        </h3>
        <Link
          href={`/movies/${id}`}
          className="my-1.5 w-24 rounded-md border-none bg-amber-400 py-1.5 text-center text-[11px] font-extrabold text-black sm:w-28 sm:text-[13px] md:my-4 md:py-2 xl:my-5 xl:text-[14px]"
        >
          Watch Now
        </Link>
      </div>
    </div>
  );
};

export default SlideShow;
