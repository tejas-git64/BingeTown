import { useEffect, Suspense, useState } from "react";
import MovieSection from "../../components/MovieSection/MovieSection";
import TVSection from "../../components/TVSection/TVSection";
import GenresSection from "../../components/GenresSection/GenresSection";
import Slideshow from "../../components/Slideshow/Slideshow";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { Movie } from "./HomeTypes";

export default function Home() {
	const [popularMovies, setPopularMovies] = useState<Movie[] | null>(null);
	//Content types based on uri
	const videoType = {
		movies: [
			{
				heading: "Now Playing",
				uri: "movie/now_playing",
			},
			{
				heading: "Popular",
				uri: "movie/popular",
			},
			{
				heading: "Top rated",
				uri: "movie/top_rated",
			},
			{
				heading: "Upcoming",
				uri: "movie/upcoming",
			},
		],
		shows: [
			{
				heading: "Currently Airing TV Shows",
				uri: "tv/airing_today",
			},
			{
				heading: "On the Air",
				uri: "tv/on_the_air",
			},
			{
				heading: "Popular TV Shows",
				uri: "tv/popular",
			},
			{
				heading: "Top Rated TV Shows",
				uri: "tv/top_rated",
			},
		],
		genres: [
			{
				id: 28,
				heading: "Action",
			},
			{
				id: 12,
				heading: "Adventure",
			},
			{
				id: 16,
				heading: "Animation",
			},
			{
				id: 35,
				heading: "Comedy",
			},
			{
				id: 80,
				heading: "Crime",
			},
			{
				id: 99,
				heading: "Documentary",
			},
			{
				id: 18,
				heading: "Drama",
			},
			{
				id: 10751,
				heading: "Family",
			},
			{
				id: 14,
				heading: "Fantasy",
			},
			{
				id: 36,
				heading: "History",
			},
			{
				id: 27,
				heading: "Horror",
			},
			{
				id: 10402,
				heading: "Music",
			},
			{
				id: 9648,
				heading: "Mystery",
			},
			{
				id: 10749,
				heading: "Romance",
			},
			{
				id: 878,
				heading: "Science Fiction",
			},
			{
				id: 53,
				heading: "Thriller",
			},
			{
				id: 10752,
				heading: "War",
			},
		],
	};

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

	async function getBannerData() {
		const popularRes = await fetch(
			`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
			options
		);
		const data = await popularRes.json();
		setPopularMovies(data.results);
	}

	useEffect(() => {
		if (popularMovies === null) getBannerData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const HomeComponent = () => {
		return (
			<>
				<motion.div className='mt-16 max-h-max min-h-[1000px] w-full scroll-smooth bg-neutral-900 px-[20px] xl:px-[45px]'>
					<motion.div
						id='slideshow'
						className='relative flex h-[440px] w-screen overflow-x-hidden md:h-[450px] xl:h-[640px] xl:pl-72'>
						{popularMovies?.map((movie) => (
							<Slideshow key={movie.id} {...movie} />
						))}
					</motion.div>
					{videoType.movies.map((movie) => (
						<MovieSection key={movie.heading} {...movie} />
					))}
					{videoType.shows.map((section) => (
						<TVSection key={section.heading} {...section} />
					))}
					<p className='mx-auto mt-6 w-full cursor-pointer text-left text-xl font-extrabold text-white'>
						Movies by Genres
					</p>
					{videoType.genres.map((section) => (
						<GenresSection key={section.id} {...section} />
					))}
				</motion.div>
			</>
		);
	};

	const DataComponent = () => {
		if (popularMovies) {
			return <HomeComponent />;
		} else {
			throw new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 0);
			});
		}
	};

	return (
		<div className='h-full w-full'>
			<Suspense fallback={<Loading />}>
				<DataComponent />
			</Suspense>
		</div>
	);
}
