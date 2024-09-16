import {
	Suspense,
	lazy,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { MovieListGenres, Movie } from "../Home/HomeTypes";
const MovieTitle = lazy(() => import("../../components/MovieTitle/MovieTitle"));
import MovieShowFallback from "./MovieShowFalback";
import { motion } from "framer-motion";

export default function Movies() {
	const [sortedMovies, setSortedMovies] = useState<Movie[] | null>([]);
	const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
	const [selected, setSelected] = useState<number | string>(28);

	const options = useMemo(
		() => ({
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
			},
		}),
		[]
	);

	async function getMovieGenres() {
		const res = await fetch(
			"https://api.themoviedb.org/3/genre/movie/list?language=en",
			options
		);
		const gen = await res.json();
		setGenres(gen.genres);
	}

	const getMoviesData = useCallback(async () => {
		const res = await fetch(
			`https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=${selected}&page=1`,
			options
		);
		const data = await res.json();
		setSortedMovies(data.results);
	}, [selected, options]);

	useEffect(() => {
		genres === null && getMovieGenres();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [genres]);

	useEffect(() => {
		getMoviesData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	const animation = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				ease: "easeInOut",
				duration: 0.5,
			},
		},
	};

	const MoviesComponent = () => {
		return (
			<>
				<motion.div
					variants={animation}
					initial='initial'
					animate='animate'
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
						gridTemplateRows: "repeat(auto-fill, minmax(200px, 1fr))",
						rowGap: "20px",
						columnGap: "30px",
					}}
					className='max-h-auto mb-6 mt-4 min-h-[500px] w-full pl-2'>
					{sortedMovies?.map((movie: Movie) => (
						<motion.div key={movie.id} variants={animation}>
							<MovieTitle {...movie} />
						</motion.div>
					))}
				</motion.div>
			</>
		);
	};

	const DataComponent = () => {
		if (sortedMovies) {
			return <MoviesComponent />;
		} else {
			throw new Promise<void>((resolve) => {
				setTimeout(() => resolve(), 0);
			});
		}
	};

	return (
		<>
			<motion.div
				variants={animation}
				initial='initial'
				animate='animate'
				className='max-h-max min-h-[1000px] w-full bg-neutral-900 px-3 pb-2 pt-20 text-left md:px-20'>
				<div className='my-3 flex w-full items-center justify-between px-2 sm:px-0'>
					<h3 className='py-2 text-xl font-bold text-teal-400 md:text-2xl'>
						Movies
					</h3>
					<select
						name='Sort by Genre'
						aria-label='Sort by genre'
						onChange={(e) => setSelected(e.target.value)}
						className='none h-8 w-32 rounded-md border-none bg-neutral-900 pr-2 text-xs font-semibold text-teal-400 outline-none'>
						{genres?.map((genre) => (
							<option
								key={genre.id}
								value={genre.id}
								className='text-white hover:bg-black hover:text-teal-400'>
								{genre.name}
							</option>
						))}
					</select>
				</div>
				<Suspense fallback={<MovieShowFallback />}>
					<DataComponent />
				</Suspense>
			</motion.div>
		</>
	);
}
