/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect, useCallback, Suspense, lazy } from "react";
const TVTitle = lazy(() => import("../../components/TVTitle/TVTitle"));
import { MovieListGenres, TVList } from "../Home/HomeTypes";
import MovieShowFallback from "../Movies/MovieShowFalback";
import { motion } from "framer-motion";

export default function Movies() {
	const [shows, setShows] = useState<TVList["shows"] | null>(null);
	const [sortedShows, setSortedShows] = useState<TVList["shows"] | null>(null);
	const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
	const [selected, setSelected] = useState<number | string>("");
	const controller = new AbortController();

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

	async function getMovieGenres() {
		const res = await fetch(
			"https://api.themoviedb.org/3/genre/tv/list?language=en",
			options
		);
		const gen = await res.json();
		setGenres(gen.genres);
	}

	async function getMoviesData() {
		//Clearing the state initially
		setShows([]);
		//Page-1
		const res1 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
			options
		);
		const data1 = await res1.json();
		//Page-2
		const res2 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=2",
			options
		);
		const data2 = await res2.json();
		//Page-3
		const res3 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=3",
			options
		);
		const data3 = await res3.json();
		//Page-4
		const res4 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=4",
			options
		);
		const data4 = await res4.json();
		//Page-5
		const res5 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=5",
			options
		);
		const data5 = await res5.json();
		//Page-6
		const res6 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=6",
			options
		);
		const data6 = await res6.json();
		//Page-7
		const res7 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=7",
			options
		);
		const data7 = await res7.json();
		//Page-8
		const res8 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=8",
			options
		);
		const data8 = await res8.json();
		//Page-9
		const res9 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=9",
			options
		);
		const data9 = await res9.json();
		//Page-10
		const res10 = await fetch(
			"https://api.themoviedb.org/3/tv/popular?language=en-US&page=10",
			options
		);
		const data10 = await res10.json();
		setShows([
			...data1.results,
			...data2.results,
			...data3.results,
			...data4.results,
			...data5.results,
			...data6.results,
			...data7.results,
			...data8.results,
			...data9.results,
			...data10.results,
		]);
		setSortedShows(shows);
	}

	function fetchPromise() {
		return new Promise<void>((resolve) => {
			setTimeout(resolve, 2000);
		});
	}

	const sortShows = useCallback(
		(sortOption: number | string) => {
			const sortedShows =
				sortOption === "all"
					? shows
					: shows?.filter((show) =>
							show.genre_ids.includes(Number(sortOption))
					  );
			sortedShows && setSortedShows(sortedShows);
		},
		[shows]
	);

	useEffect(() => {
		getMovieGenres();
		getMoviesData();
		setSelected("all");
		return () => {
			controller.abort();
		};
	}, []);

	useEffect(() => {
		sortShows(selected);
	}, [selected, sortShows]);

	const animation = {
		initial: {
			x: "-10rem",
			opacity: 0,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				ease: "easeInOut",
				duration: 1,
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
					className='mb-10 mt-4 h-auto w-full pl-4 sm:pl-0'>
					{sortedShows?.map((show) => (
						<motion.div key={show.id} variants={animation}>
							<TVTitle
								adult={false}
								backdrop_path={""}
								first_air_date={show.first_air_date}
								genre_ids={[]}
								id={show.id}
								original_language={""}
								overview={""}
								popularity={0}
								poster_path={show.poster_path}
								title={""}
								vote_average={show.vote_average}
								vote_count={0}
								isShow={false}
								name={show.name}
								origin_country={[]}
								original_name={""}
								show_vote_average={""}
							/>
						</motion.div>
					))}
				</motion.div>
			</>
		);
	};

	const DataComponent = () => {
		if (!shows || !sortedShows) {
			throw fetchPromise();
		} else {
			return <TVComponent />;
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
				className='max-h-max min-h-[1000px] w-full bg-neutral-800 px-6 pb-8 pt-20 text-left md:px-20'>
				<div className='flex w-full items-center justify-between px-4 sm:px-0'>
					<h3 className='mb-2 py-2 text-xl font-bold text-teal-400 md:text-2xl'>
						TV Shows
					</h3>
					<select
						name='Sort by Genre'
						onChange={(e) => setSelected(e.target.value)}
						className='h-8 w-48 rounded-md bg-neutral-600 px-2 font-semibold text-white'>
						<option
							id='all'
							value={"all"}
							className='text-white hover:bg-black hover:text-teal-400'>
							All
						</option>
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
