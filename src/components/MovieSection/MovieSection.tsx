import { memo, Suspense, useEffect, useRef, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ContentType, Movie } from "../../pages/Home/HomeTypes";
const MovieTitle = React.lazy(() => import("../MovieTitle/MovieTitle"));
import { motion } from "framer-motion";
const Loading = React.lazy(() => import("./Loading"));

const isSameSection = (prevProps: ContentType, nextProps: ContentType) => {
	return prevProps.heading === nextProps.heading;
};

const MovieSection = memo(({ heading, uri }: ContentType) => {
	const [movies, setMovies] = useState<Movie[] | null>(null);

	async function fetchMoviesData() {
		const response = await fetch(
			`https://api.themoviedb.org/3/${uri}?language=en-US&page=1`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
				},
			}
		);
		const data = await response.json();
		data && setMovies(data.results);
	}

	const animation = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.35,
				ease: "easeInOut",
				duration: 0.2,
			},
		},
	};

	const navigate = useNavigate();
	const sectionRef = useRef(null);
	const introptions = {
		rootMargin: "200px",
		threshold: 1.0,
	};

	useEffect(() => {
		const titleObserver = new IntersectionObserver((enteries) => {
			enteries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (movies === null) fetchMoviesData();
				}
			});
		}, introptions);
		if (sectionRef.current) {
			titleObserver.observe(sectionRef.current);
		}
		// Cleanup the observer on component unmount
		return () => {
			titleObserver.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sectionRef.current]);

	const MovieSectionComponent = () => {
		return (
			<motion.div
				id={"latest"}
				className='mx-auto flex h-[310px] w-[calc(100%-5%)] overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] md:pb-4 lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
				{movies?.map((movie: Movie) => (
					<motion.div key={movie.id} variants={animation}>
						<MovieTitle
							key={movie.id}
							adult={false}
							backdrop_path={""}
							first_air_date={""}
							genre_ids={[]}
							id={movie.id}
							original_language={""}
							original_title={""}
							overview={""}
							popularity={0}
							poster_path={movie.poster_path}
							release_date={movie.release_date}
							title={movie.title}
							video={false}
							vote_average={movie.vote_average}
							vote_count={0}
							genre={movie.genre}
						/>
					</motion.div>
				))}
			</motion.div>
		);
	};

	const DataComponent = () => {
		if (!movies) {
			throw new Promise<void>((resolve): void => {
				setTimeout(() => resolve(), 100);
			});
		} else {
			return <MovieSectionComponent />;
		}
	};

	return (
		<>
			<section
				id={heading}
				ref={sectionRef}
				className=' titles mx-auto my-4 h-auto w-full md:h-auto'>
				<h2
					onClick={() => navigate("/movies")}
					className='mx-auto w-full cursor-pointer p-4 pl-3 text-left text-xl font-extrabold text-amber-500 sm:w-[calc(100%-8%)]'>
					{heading}
				</h2>
				<Suspense fallback={<Loading key={heading} />}>
					<DataComponent />
				</Suspense>
			</section>
		</>
	);
}, isSameSection);

export default MovieSection;
