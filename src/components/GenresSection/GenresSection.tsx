import React from "react";
import { useNavigate } from "react-router-dom";
import { Movie, MoviesType } from "../../pages/Home/HomeTypes";
const MovieTitle = React.lazy(() => import("../MovieTitle/MovieTitle"));
import { motion } from "framer-motion";
import { Suspense } from "react";
const Loading = React.lazy(() => import("../MovieSection/Loading"));

const GenresSection = ({ movies, heading }: MoviesType) => {
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

	const GenresSectionComponent = () => {
		return (
			<motion.div
				id='genre'
				className='mx-auto flex h-[310px] w-[calc(100%-5%)] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
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
				setTimeout(() => resolve(), 1000);
			});
		} else {
			return <GenresSectionComponent />;
		}
	};

	return (
		<>
			<section className='mx-auto h-auto w-full md:h-auto'>
				<h2
					onClick={() => navigate("/movies")}
					className='mx-auto w-full cursor-pointer p-4 pl-3 text-left text-xl font-extrabold text-amber-500 sm:w-[calc(100%-8%)]'>
					{heading}
				</h2>
				<Suspense fallback={<Loading />}>
					<DataComponent />
				</Suspense>
			</section>
		</>
	);
};

export default GenresSection;
