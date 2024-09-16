/* eslint-disable react-hooks/exhaustive-deps */
import {
	useState,
	useEffect,
	useCallback,
	Suspense,
	lazy,
	useMemo,
} from "react";
const TVTitle = lazy(() => import("../../components/TVTitle/TVTitle"));
import { MovieListGenres, TVList } from "../Home/HomeTypes";
import MovieShowFallback from "../Movies/MovieShowFalback";
import { motion } from "framer-motion";

export default function TVShows() {
	const [sortedShows, setSortedShows] = useState<TVList["shows"] | null>(null);
	const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
	const [selected, setSelected] = useState<number | string>("");

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
		genres === null && getShowGenres();
	}, []);

	useEffect(() => {
		getShowsData();
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
				duration: 0.25,
			},
		},
	};

	const TVComponent = () => {
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
						rowGap: "30px",
						columnGap: "30px",
					}}
					className='mb-10 ml-2 mt-4 h-auto w-full sm:ml-0 sm:pl-0'>
					{sortedShows?.map((show) => (
						<motion.div key={show.id} variants={animation}>
							<TVTitle {...show} isShow={false} />
						</motion.div>
					))}
				</motion.div>
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
			<motion.div
				variants={animation}
				initial='initial'
				animate='animate'
				className='max-h-max min-h-[1000px] w-full bg-neutral-900 px-6 pb-8 pt-20 text-left md:px-20'>
				<div className='my-3 flex w-full items-center justify-between px-2 sm:px-0'>
					<h3 className='mb-2 py-2 text-xl font-bold text-teal-400 md:text-2xl'>
						TV Shows
					</h3>
					<select
						name='Sort by Genre'
						onChange={(e) => setSelected(e.target.value)}
						aria-label='Sort by genre'
						className='h-8 w-40 rounded-md border-none bg-neutral-900 pr-2 text-xs font-semibold text-teal-400 outline-none'>
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
