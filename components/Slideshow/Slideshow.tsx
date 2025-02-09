"use client";
import { Movie } from "@/types/HomeTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

// const isSameSlideShow = (prevProps: Movie, nextProps: Movie) => {
//   return prevProps.id === nextProps.id;
// };

// eslint-disable-next-line react/display-name
const SlideShow = memo(
  ({ backdrop_path, title, overview, id, release_date }: Movie) => {
    const { push } = useRouter();
    const formatter = new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const date = new Date(release_date);
    const [backwidth, setbackWidth] = useState("w780");
    function showTitle() {
      push(`/movies/${id}`);
    }

    function adjustBackdrop() {
      switch (true) {
        case innerWidth <= 480:
          setbackWidth("w780");
          break;
        case innerWidth <= 1280:
          setbackWidth("w1280");
          break;
        case innerWidth > 1280:
          setbackWidth("w1280");
          break;
        default:
          setbackWidth("original");
          break;
      }
    }

    useEffect(() => {
      adjustBackdrop();
    }, []);

    return (
      <>
        <div className="animate-slide animation-duration-200 relative mr-1 flex h-[280px] w-full flex-shrink-0 flex-col justify-center overflow-hidden rounded-2xl pl-4 pt-16 text-left transition-all sm:h-[350px] sm:pl-20 md:mt-0 md:h-[440px] md:w-[780px] md:pl-32 xl:h-[640px] xl:w-[1280px] xl:pl-44">
          <Image
            src={`https://image.tmdb.org/t/p/${backwidth}/${backdrop_path}`}
            width={1761}
            height={991}
            fetchPriority="high"
            loading="eager"
            placeholder="empty"
            alt="slideshow-img"
            className={`absolute left-0 top-0 z-0 h-full w-full object-cover`}
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
            <button
              onClick={showTitle}
              className="md:w-35 my-2 w-24 rounded-md border-none bg-amber-400 py-1.5 text-[11px] font-extrabold text-black outline-none transition-all duration-[1] ease-linear hover:scale-105 sm:w-28 sm:text-[13px] md:my-4 md:py-2 xl:my-5 xl:text-[14px]"
            >
              Watch Now
            </button>
          </div>
        </div>
      </>
    );
  },
);

export default SlideShow;
