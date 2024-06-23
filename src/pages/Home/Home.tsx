import { useEffect, useState, lazy, Suspense } from "react";
import { MoviesType, TVList } from "./HomeTypes";
const MovieSection = lazy(
	() => import("../../components/MovieSection/MovieSection")
);
const TVSection = lazy(() => import("../../components/TVSection/TVSection"));
const Slideshow = lazy(() => import("../../components/Slideshow/Slideshow"));
import Loading from "./Loading";
import { motion } from "framer-motion";

const GenresSection = lazy(
	() => import("../../components/GenresSection/GenresSection")
);

export default function Home() {
	// Movie States
	const [popularMovies, setPopularMovies] = useState<
		MoviesType["movies"] | null
	>(null);
	const [latestMovies, setLatestMovies] = useState<MoviesType["movies"] | null>(
		null
	);
	const [topMovies, setTopMovies] = useState<MoviesType["movies"] | null>(null);
	const [upcomingMovies, setUpcomingMovies] = useState<
		MoviesType["movies"] | null
	>(null);
	// Genres States
	const [action, setAction] = useState<MoviesType["movies"] | null>(null);
	const [adventure, setAdventure] = useState<MoviesType["movies"] | null>(null);
	const [animation, setAnimation] = useState<MoviesType["movies"] | null>(null);
	const [comedy, setComedy] = useState<MoviesType["movies"] | null>(null);
	const [crime, setCrime] = useState<MoviesType["movies"] | null>(null);
	const [documentary, setDocumentary] = useState<MoviesType["movies"] | null>(
		null
	);
	const [drama, setDrama] = useState<MoviesType["movies"] | null>(null);
	const [family, setFamily] = useState<MoviesType["movies"] | null>(null);
	const [fantasy, setFantasy] = useState<MoviesType["movies"] | null>(null);
	const [history, setHistory] = useState<MoviesType["movies"] | null>(null);
	const [horror, setHorror] = useState<MoviesType["movies"] | null>(null);
	const [music, setMusic] = useState<MoviesType["movies"] | null>(null);
	const [mystery, setMystery] = useState<MoviesType["movies"] | null>(null);
	const [romance, setRomance] = useState<MoviesType["movies"] | null>(null);
	const [scienceFiction, setScienceFiction] = useState<
		MoviesType["movies"] | null
	>(null);
	const [thriller, setThriller] = useState<MoviesType["movies"] | null>(null);
	const [war, setWar] = useState<MoviesType["movies"] | null>(null);
	//TV Shows states
	const [airing, setAiring] = useState<TVList["shows"] | null>(null);
	const [otas, setOtas] = useState<TVList["shows"] | null>(null);
	const [popularShows, setPopularShows] = useState<TVList["shows"] | null>(
		null
	);
	const [topRated, setTopRated] = useState<TVList["shows"] | null>(null);

	const movieSections = [
		{
			content: latestMovies,
			heading: "Latest Movies",
		},
		{
			content: upcomingMovies,
			heading: "Upcoming Movies",
		},
		{
			content: topMovies,
			heading: "Top Movies",
		},
	];

	const genres = [
		{
			id: 28,
			content: action,
			heading: "Action",
		},
		{
			id: 12,
			content: adventure,
			heading: "Adventure",
		},
		{
			id: 16,
			content: animation,
			heading: "Animation",
		},
		{
			id: 35,
			content: comedy,
			heading: "Comedy",
		},
		{
			id: 80,
			content: crime,
			heading: "Crime",
		},
		{
			id: 99,
			content: documentary,
			heading: "Documentary",
		},
		{
			id: 18,
			content: drama,
			heading: "Drama",
		},
		{
			id: 10751,
			content: family,
			heading: "Family",
		},
		{
			id: 14,
			content: fantasy,
			heading: "Fantasy",
		},
		{
			id: 36,
			content: history,
			heading: "History",
		},
		{
			id: 27,
			content: horror,
			heading: "Horror",
		},
		{
			id: 10402,
			content: music,
			heading: "Music",
		},
		{
			id: 9648,
			content: mystery,
			heading: "Mystery",
		},
		{
			id: 10749,
			content: romance,
			heading: "Romance",
		},
		{
			id: 878,
			content: scienceFiction,
			heading: "Science Fiction",
		},
		{
			id: 53,
			content: thriller,
			heading: "Thriller",
		},
		{
			id: 10752,
			content: war,
			heading: "War",
		},
	];

	const tvSections = [
		{
			content: airing,
			heading: "Currently Airing TV Shows",
		},
		{
			content: otas,
			heading: "On the Air",
		},
		{
			content: popularShows,
			heading: "Popular TV Shows",
		},
		{
			content: topRated,
			heading: "Top Rated TV Shows",
		},
	];

	//Content types based on uri
	const videoType = {
		movies: [
			"movie/now_playing",
			"movie/popular",
			"movie/top_rated",
			"movie/upcoming",
		],
		shows: ["tv/airing_today", "tv/on_the_air", "tv/popular", "tv/top_rated"],
	};

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

	async function getMoviesorTVData(type: string) {
		const response = await fetch(
			`https://api.themoviedb.org/3/${type}?language=en-US&page=1`,
			options
		);
		const data = await response.json();
		switch (true) {
			case type === "movie/now_playing":
				latestMovies === null && setLatestMovies(data.results);
				break;
			case type === "movie/top_rated":
				topMovies === null && setTopMovies(data.results);
				break;
			case type === "movie/upcoming":
				upcomingMovies && setUpcomingMovies(data.results);
				break;
			case type === "tv/airing_today":
				airing === null && setAiring(data.results);
				break;
			case type === "tv/popular":
				popularShows === null && setPopularShows(data.results);
				break;
			case type === "tv/on_the_air":
				otas === null && setOtas(data.results);
				break;
			case type === "tv/top_rated":
				topRated === null && setTopRated(data.results);
				break;
			default:
				return;
		}
	}

	async function getGenresData(genreid: number) {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreid}`,
			options
		);
		const data = await response.json();
		switch (true) {
			case genreid === 28:
				setAction(data.results);
				break;
			case genreid === 12:
				setAdventure(data.results);
				break;
			case genreid === 16:
				setAnimation(data.results);
				break;
			case genreid === 35:
				setComedy(data.results);
				break;
			case genreid === 80:
				setCrime(data.results);
				break;
			case genreid === 99:
				setDocumentary(data.results);
				break;
			case genreid === 18:
				setDrama(data.results);
				break;
			case genreid === 10751:
				setFamily(data.results);
				break;
			case genreid === 14:
				setFantasy(data.results);
				break;
			case genreid === 36:
				setHistory(data.results);
				break;
			case genreid === 27:
				setHorror(data.results);
				break;
			case genreid === 10402:
				setMusic(data.results);
				break;
			case genreid === 9648:
				setMystery(data.results);
				break;
			case genreid === 10749:
				setRomance(data.results);
				break;
			case genreid === 878:
				setScienceFiction(data.results);
				break;
			case genreid === 53:
				setThriller(data.results);
				break;
			case genreid === 10752:
				setWar(data.results);
				break;
		}
	}

	function getGenres() {
		genres.forEach((genre) => getGenresData(genre.id));
	}

	async function getBannerData() {
		const popularRes = await fetch(
			`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
			options
		);
		const data = await popularRes.json();
		setPopularMovies(data.results);
		const upcomingRes = await fetch(
			`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
			options
		);
		const upcomingData = await upcomingRes.json();
		setUpcomingMovies(upcomingData.results);
	}

	useEffect(() => {
		getBannerData();
		getMoviesorTVData("movie/now_playing");
		getGenres();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const HomeComponent = () => {
		return (
			<>
				<motion.div className='max-h-max min-h-[1000px] w-full scroll-smooth bg-neutral-900 pb-20'>
					<motion.div
						id='slideshow'
						className='relative flex h-[440px] w-full overflow-x-hidden sm:pl-28 md:h-[440px] md:pl-0 lg:pl-32 xl:h-[720px] xl:pl-0 2xl:h-[800px] 2xl:pl-32'>
						{popularMovies?.map((movie) => (
							<Slideshow
								key={movie.id}
								adult={false}
								backdrop_path={movie.backdrop_path}
								first_air_date={""}
								genre_ids={[]}
								id={movie.id}
								genre={0}
								original_language={""}
								original_title={""}
								overview={movie.overview}
								popularity={0}
								poster_path={""}
								release_date={movie.release_date}
								title={movie.title}
								video={false}
								vote_average={0}
								vote_count={0}
							/>
						))}
					</motion.div>
					{movieSections?.map((section, i) => (
						<MovieSection
							key={section.heading}
							movies={section.content}
							heading={section.heading}
							genre={0}
							id={videoType.movies[i]}
							getMoviesorTVData={getMoviesorTVData}
						/>
					))}
					{tvSections.map((section, i) => (
						<TVSection
							key={section.heading}
							shows={section.content}
							heading={section.heading}
							id={videoType.shows[i]}
							getMoviesorTVData={getMoviesorTVData}
						/>
					))}
					<p className='mx-auto mt-4 w-full py-3 pl-3 text-left text-2xl text-red-400 sm:mt-2 md:w-[calc(100%-9.8%)]'>
						Get MoviesType by Genres
					</p>
					{genres.map((section) => (
						<GenresSection
							key={section.heading}
							genre={section.id}
							movies={section.content}
							heading={section.heading}
							getMoviesorTVData={getMoviesorTVData}
							id={""}
						/>
					))}
				</motion.div>
			</>
		);
	};

	const DataComponent = () => {
		if (popularMovies && latestMovies) {
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
