import { useNavigate } from "react-router-dom";
import { Movie, Movies } from "../../pages/Home/HomeTypes";
import MovieTitle from "../MovieTitle/MovieTitle";
import { motion } from "framer-motion";

export default function MovieSection({ movies, heading }: Movies) {
	const animation = {
		initial: {
			x: "-10rem",
			opacity: 0,
		},
		animate: {
			x: 0,
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				ease: "easeInOut",
				duration: 1,
			},
		},
	};

	const navigate = useNavigate();
	return (
		<>
			<motion.section
				variants={animation}
				initial='initial'
				animate='animate'
				className='mx-auto mt-4 h-[400px] w-full md:h-auto'>
				<h2
					onClick={() => navigate("/movies")}
					className='mx-auto w-[calc(100%-3%)] cursor-pointer p-4 text-left text-xl font-extrabold text-amber-500 sm:w-[calc(100%-8%)]'>
					{heading}
				</h2>
				<motion.div
					id='latest'
					className='mx-auto flex h-[350px] w-[calc(100%-10%)] overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] md:pb-4 lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
					{movies &&
						movies?.map((movie: Movie) => (
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
			</motion.section>
		</>
	);
}
