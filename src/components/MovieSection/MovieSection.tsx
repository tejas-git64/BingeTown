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
				className='mx-auto flex h-[310px] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto'>
				{movies?.map((movie: Movie) => (
					<motion.div
						key={movie.id}
						variants={animation}
						className='mr-2 sm:mr-4'>
						<MovieTitle key={movie.id} {...movie} />
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
				className='titles mx-auto my-4 h-auto w-full md:h-auto'>
				<h2
					onClick={() => navigate("/movies")}
					className='mx-auto w-full cursor-pointer text-left text-lg font-extrabold text-white'>
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
