import MovieSection from "@/components/MovieSection/MovieSection";
import TVSection from "@/components/TVSection/TVSection";
import GenresSection from "@/components/GenresSection/GenresSection";
import SlideShow from "@/components/Slideshow/Slideshow";
import SlideshowCarousel from "@/components/Slideshow/SlideshowCarousel";
import { Movie } from "@/types/HomeTypes";
import { videoType } from "@/utils/utils";
import { getMediaData } from "@/api/requests";
import BannerFallback from "@/components/Fallback/Banner/BannerFallback";

export default async function Home() {
  const data = await getMediaData(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
  );

  return (
    <div className="h-full w-full">
      <div className="max-h-max min-h-[1000px] w-full scroll-smooth bg-neutral-900 px-2 md:px-3 xl:px-6">
        <SlideshowCarousel>
          {data ? (
            data?.results.map((movie: Movie) => (
              <SlideShow key={movie.id} {...movie} />
            ))
          ) : (
            <BannerFallback />
          )}
        </SlideshowCarousel>
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
  );
}
