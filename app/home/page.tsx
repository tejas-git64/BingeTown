import { Suspense } from "react";
import MovieSection from "@/components/MovieSection/MovieSection";
import TVSection from "@/components/TVSection/TVSection";
import GenresSection from "@/components/GenresSection/GenresSection";
import SlideShow from "@/components/Slideshow/Slideshow";
import Loading from "./loading";
import { Movie } from "@/types/HomeTypes";
import { videoType } from "@/utils/utils";
import { getMediaData } from "@/api/requests";

export default async function Home() {
  const data: Movie[] = await getMediaData(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
  );

  return (
    <div className="h-full w-full">
      <Suspense fallback={<Loading />}>
        <div className="mt-2 max-h-max min-h-[1000px] w-full scroll-smooth bg-neutral-900">
          <div
            id="slideshow"
            className="relative flex h-[440px] w-screen overflow-x-hidden sm:px-[20px] md:h-[450px] xl:h-[640px] xl:px-[45px] xl:pl-72"
          >
            {data.map((movie) => (
              <SlideShow key={movie.id} {...movie} />
            ))}
          </div>
          <div className="px-[20px] xl:px-[45px]">
            {videoType.movies.map((movie) => (
              <MovieSection key={movie.heading} {...movie} />
            ))}
            {videoType.shows.map((section) => (
              <TVSection key={section.heading} {...section} />
            ))}
            <p className="mx-auto mt-6 w-full cursor-pointer text-left text-xl font-extrabold text-white">
              Movies by Genres
            </p>
            {videoType.genres.map((section) => (
              <GenresSection key={section.id} {...section} />
            ))}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
