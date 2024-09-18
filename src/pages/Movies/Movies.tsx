import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { MovieListGenres, Movie } from "../Home/HomeTypes";
const MovieTitle = lazy(() => import("../../components/MovieTitle/MovieTitle"));
import MovieShowFallback from "./MovieShowFalback";
import { motion } from "framer-motion";

export default function Movies() {
	const [sortedMovies, setSortedMovies] = useState<Movie[] | null>([]);
	const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
	const [selected, setSelected] = useState<number | string>(28);

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

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
						gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
						gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
					}}
					className='mb-6 mt-4 h-auto gap-x-4 gap-y-4 md:gap-x-6'>
					{sortedMovies?.map((movie: Movie) => (
						<motion.div
							key={movie.id}
							variants={animation}
							className='mx-auto w-min'>
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
				className='max-h-auto h-full w-full bg-neutral-900 px-5 pb-2 pt-12 text-left md:px-6'>
				<div className='my-4 flex h-auto w-full items-center justify-between'>
					<h3 className='py-2 text-base font-bold text-white md:text-lg'>
						Movies
					</h3>
					<select
						name='Sort by Genre'
						aria-label='Sort by genre'
						onChange={(e) => setSelected(e.target.value)}
						className='none h-8 w-32 rounded-md border-none bg-neutral-900 text-xs font-semibold text-white outline-none'>
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
