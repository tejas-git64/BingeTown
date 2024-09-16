import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GenreType, Movie } from "../../pages/Home/HomeTypes";
const MovieTitle = React.lazy(() => import("../MovieTitle/MovieTitle"));
import { motion } from "framer-motion";
import { Suspense } from "react";
const Loading = React.lazy(() => import("../MovieSection/Loading"));

const isSameGenre = (prevProps: GenreType, nextProps: GenreType) => {
	return prevProps.id === nextProps.id;
};

const GenresSection = memo(({ id, heading }: GenreType) => {
	const [genreMovies, setGenreMovies] = useState<Movie[] | null>(null);
	const animation = {
		initial: {
			x: "-5rem",
			opacity: 0,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
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
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

	async function fetchGenreData() {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
			options
		);
		const data = await response.json();
		data && setGenreMovies(data.results);
	}

	useEffect(() => {
		const titleObserver = new IntersectionObserver((enteries) => {
			enteries.forEach((entry) => {
				if (entry.isIntersecting) {
					genreMovies === null && fetchGenreData();
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

	const GenresSectionComponent = () => {
		return (
			<motion.div
				id='genre'
				className='mx-auto flex h-[310px] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto'>
				{genreMovies?.map((movie: Movie) => (
					<motion.div key={movie.id} variants={animation}>
						<MovieTitle {...movie} key={movie.id} />
					</motion.div>
				))}
			</motion.div>
		);
	};

	const DataComponent = () => {
		if (!genreMovies) {
			throw new Promise<void>((resolve): void => {
				setTimeout(() => resolve(), 0);
			});
		} else {
			return <GenresSectionComponent />;
		}
	};

	return (
		<>
			<section
				ref={sectionRef}
				className='titles mx-auto my-4 h-auto w-full md:h-auto'>
				<h2
					onClick={() => navigate("/movies")}
					className='mx-auto w-full cursor-pointer text-left text-lg font-extrabold text-white'>
					{heading}
				</h2>
				<Suspense fallback={<Loading />}>
					<DataComponent />
				</Suspense>
			</section>
		</>
	);
}, isSameGenre);

export default GenresSection;
