import { Suspense, useEffect, useState, lazy } from "react";
import { Movies, TVList } from "./HomeTypes";
const MovieSection = lazy(
	() => import("../../components/MovieSection/MovieSection")
);
const TVSection = lazy(() => import("../../components/TVSection/TVSection"));
const Slideshow = lazy(() => import("../../components/Slideshow/Slideshow"));
import Loading from "./Loading";
import { motion } from "framer-motion";

export default function Home() {
	// Movie States
	const [latestMovies, setLatestMovies] = useState<Movies["movies"] | null>(
		null
	);
	const [popularMovies, setPopularMovies] = useState<Movies["movies"] | null>(
		null
	);
	const [topMovies, setTopMovies] = useState<Movies["movies"] | null>(null);
	const [upcomingMovies, setUpcomingMovies] = useState<Movies["movies"] | null>(
		null
	);
	// Genres States
	const [action, setAction] = useState<Movies["movies"] | null>(null);
	const [adventure, setAdventure] = useState<Movies["movies"] | null>(null);
	const [animation, setAnimation] = useState<Movies["movies"] | null>(null);
	const [comedy, setComedy] = useState<Movies["movies"] | null>(null);
	const [crime, setCrime] = useState<Movies["movies"] | null>(null);
	const [documentary, setDocumentary] = useState<Movies["movies"] | null>(null);
	const [drama, setDrama] = useState<Movies["movies"] | null>(null);
	const [family, setFamily] = useState<Movies["movies"] | null>(null);
	const [fantasy, setFantasy] = useState<Movies["movies"] | null>(null);
	const [history, setHistory] = useState<Movies["movies"] | null>(null);
	const [horror, setHorror] = useState<Movies["movies"] | null>(null);
	const [music, setMusic] = useState<Movies["movies"] | null>(null);
	const [mystery, setMystery] = useState<Movies["movies"] | null>(null);
	const [romance, setRomance] = useState<Movies["movies"] | null>(null);
	const [scienceFiction, setScienceFiction] = useState<Movies["movies"] | null>(
		null
	);
	const [thriller, setThriller] = useState<Movies["movies"] | null>(null);
	const [war, setWar] = useState<Movies["movies"] | null>(null);
	// TV Shows states
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
			content: topMovies,
			heading: "Top Movies",
		},
		{
			content: upcomingMovies,
			heading: "Upcoming Movies",
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

	const videoType = [
		"movie/now_playing",
		"movie/popular",
		"movie/top_rated",
		"movie/upcoming",
		"tv/airing_today",
		"tv/on_the_air",
		"tv/popular",
		"tv/top_rated",
	];

	const controller = new AbortController();
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

	const getBannerData = async () => {
		const response = await fetch(
			`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
			options
		);
		const data = await response.json();
		setPopularMovies(data.results);
	};

	const getMovieOrTVData = async (type: string) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/${type}?language=en-US&page=1`,
			options
		);
		const data = await response.json();
		if (type.includes("movie")) {
			switch (true) {
				case type.includes("now_playing"):
					setLatestMovies(data.results);
					break;
				case type.includes("top_rated"):
					setTopMovies(data.results);
					break;
				case type.includes("upcoming"):
					setUpcomingMovies(data.results);
					break;
			}
		} else {
			switch (true) {
				case type.includes("airing_today"):
					setAiring(data.results);
					break;
				case type.includes("popular"):
					setOtas(data.results);
					break;
				case type.includes("on_the_air"):
					setPopularShows(data.results);
					break;
				case type.includes("top_rated"):
					setTopRated(data.results);
					break;
			}
		}
	};

	const getGenresData = async (genre: number) => {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genre}`,
			options
		);
		const data = await response.json();
		switch (true) {
			case genre === 28:
				setAction(data.results);
				break;
			case genre === 12:
				setAdventure(data.results);
				break;
			case genre === 16:
				setAnimation(data.results);
				break;
			case genre === 35:
				setComedy(data.results);
				break;
			case genre === 80:
				setCrime(data.results);
				break;
			case genre === 99:
				setDocumentary(data.results);
				break;
			case genre === 18:
				setDrama(data.results);
				break;
			case genre === 10751:
				setFamily(data.results);
				break;
			case genre === 14:
				setFantasy(data.results);
				break;
			case genre === 36:
				setHistory(data.results);
				break;
			case genre === 27:
				setHorror(data.results);
				break;
			case genre === 10402:
				setMusic(data.results);
				break;
			case genre === 9648:
				setMystery(data.results);
				break;
			case genre === 10749:
				setRomance(data.results);
				break;
			case genre === 878:
				setScienceFiction(data.results);
				break;
			case genre === 53:
				setThriller(data.results);
				break;
			case genre === 10752:
				setWar(data.results);
				break;
		}
	};

	const pagevar = {
		initial: {
			opacity: 0,
			translateY: -20,
		},
		animate: {
			opacity: 1,
			translateY: 0,
		},
		exit: {
			opacity: 0,
			translateY: -20,
		},
		transition: {
			type: "spring",
			duration: 3,
			ease: "easeIn",
		},
	};

	const HomeComponent = () => {
		return (
			<>
				<motion.div
					variants={pagevar}
					initial='initial'
					animate='animate'
					exit='exit'
					transition={{
						delay: 0.5,
						duration: 1,
					}}
					id='slideshow'
					className='flex h-[500px] w-full overflow-x-scroll xl:h-[600px] 2xl:h-[700px]'>
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
				{movieSections.map((section) => (
					<MovieSection
						key={section.heading}
						movies={section.content}
						heading={section.heading}
						genre={0}
					/>
				))}
				{tvSections.map((section) => (
					<TVSection
						key={section.heading}
						shows={section.content}
						heading={section.heading}
					/>
				))}
				<p className='mx-auto -mb-4 mt-10 w-[calc(100%-10%)] py-3 text-left text-2xl text-red-400 md:w-[calc(100%-9.8%)]'>
					Get Movies by Genres
				</p>
				{genres.map((section) => (
					<MovieSection
						key={section.heading}
						genre={section.id}
						movies={section.content}
						heading={section.heading}
					/>
				))}
			</>
		);
	};

	useEffect(() => {
		//For movies slideshow
		getBannerData();
		//To get movies and TV data
		for (const i in videoType) {
			getMovieOrTVData(videoType[i]);
		}
		// To get all genres
		for (const j in genres) {
			getGenresData(genres[j].id);
		}
		return () => {
			controller.abort();
		};
	}, []);

	function fetchPromise() {
		return new Promise<void>((resolve) => {
			setTimeout(resolve, 2000);
		});
	}

	const DataComponent = () => {
		if (
			!latestMovies ||
			!popularMovies ||
			!topMovies ||
			!upcomingMovies ||
			!action ||
			!adventure ||
			!animation ||
			!comedy ||
			!crime ||
			!documentary ||
			!drama ||
			!family ||
			!fantasy ||
			!history ||
			!horror ||
			!music ||
			!mystery ||
			!romance ||
			!scienceFiction ||
			!thriller ||
			!war ||
			!airing ||
			!otas ||
			!popularShows ||
			!topRated
		) {
			throw fetchPromise();
		} else {
			return <HomeComponent />;
		}
	};

	return (
		<>
			<Suspense fallback={<Loading />}>
				<div className='max-h-max min-h-[1000px] w-full bg-neutral-900 pb-20'>
					<DataComponent />
				</div>
			</Suspense>
		</>
	);
}
