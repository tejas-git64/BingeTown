import { Suspense, useCallback, useEffect, useState } from "react";
import { MovieListGenres, Movie } from "../../types/HomeTypes";
import MovieShowFallback from "./loading";
import MovieTitle from "@/components/MovieTitle/MovieTitle";

export default function Movies() {
	const [sortedMovies, setSortedMovies] = useState<Movie[] | null>([]);
	const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
	const [selected, setSelected] = useState<number | string>(28);

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: process.env.TMDB_READ_ACCESS_KEY as string,
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
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		!genres && getMovieGenres();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [genres]);

	useEffect(() => {
		getMoviesData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selected]);

	const MoviesComponent = () => {
		return (
			<>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
						gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
					}}
					className='mb-6 mt-4 h-auto gap-x-4 gap-y-4 md:gap-x-6'>
					{sortedMovies?.map((movie: Movie) => (
						<div key={movie.id} className='mx-auto w-min'>
							<MovieTitle {...movie} />
						</div>
					))}
				</div>
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
			<div className='max-h-auto h-full w-full bg-neutral-900 px-5 pb-2 pt-12 text-left md:px-6'>
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
			</div>
		</>
	);
}
