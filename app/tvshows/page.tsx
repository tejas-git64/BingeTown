/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback, Suspense, useMemo } from "react";
import { MovieListGenres, TVList } from "../../types/HomeTypes";
import MovieShowFallback from "../movies/loading";
import TVTitle from "@/components/TVTitle/TVTitle";

export default function TVShows() {
	const [sortedShows, setSortedShows] = useState<TVList["shows"] | null>(null);
	const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
	const [selected, setSelected] = useState<number | string>("");

	const options = useMemo(
		() => ({
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.TMDB_READ_ACCESS_KEY as string,
			},
		}),
		[]
	);

	async function getShowGenres() {
		const res = await fetch(
			"https://api.themoviedb.org/3/genre/tv/list?language=en",
			options
		);
		const gen = await res.json();
		setGenres(gen.genres);
	}

	const getShowsData = useCallback(async () => {
		const res = await fetch(
			`https://api.themoviedb.org/3/discover/tv?language=en-US&with_genres=${selected}&page=1`,
			options
		);
		const data = await res.json();
		setSortedShows(data.results);
	}, [selected, options]);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		genres === null && getShowGenres();
	}, []);

	useEffect(() => {
		getShowsData();
	}, [selected]);

	const TVComponent = () => {
		return (
			<>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
						gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
					}}
					className='mb-6 mt-4 h-auto gap-x-4 gap-y-4 md:gap-x-6'>
					{sortedShows?.map((show) => (
						<div key={show.id} className='mx-auto w-min'>
							<TVTitle {...show} isShow={false} />
						</div>
					))}
				</div>
			</>
		);
	};

	const DataComponent = () => {
		if (sortedShows) {
			return <TVComponent />;
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
						TV Shows
					</h3>
					<select
						name='Sort by Genre'
						onChange={(e) => setSelected(e.target.value)}
						aria-label='Sort by genre'
						className='mr-1 h-8 w-36 rounded-md border-none bg-neutral-900 text-xs font-semibold text-white outline-none'>
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
