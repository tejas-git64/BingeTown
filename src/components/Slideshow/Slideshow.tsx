import { useNavigate } from "react-router-dom";
import { Movie } from "../../pages/Home/HomeTypes";
import { motion } from "framer-motion";

export default function Slideshow({
	backdrop_path,
	title,
	overview,
	id,
	release_date,
}: Movie) {
	const navigate = useNavigate();

	function showTitle() {
		navigate(`/movies/${id}`);
	}

	return (
		<>
			<motion.div
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
					backgroundPosition: "top",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundColor: "#0003",
					backgroundBlendMode: "multiply",
				}}
				initial={{
					opacity: 0,
				}}
				whileInView={{
					opacity: 1,
				}}
				transition={{
					duration: 1,
				}}
				className={`md:pl-30 mr-4 flex h-full w-full flex-shrink-0 flex-col justify-center bg-contain bg-center bg-no-repeat pl-10 pt-16 text-left sm:pl-20 md:mt-0 md:bg-cover md:pl-32 xl:pl-44`}>
				<motion.p
					initial={{
						opacity: 0,
						scale: 0.9,
						translateX: 0,
					}}
					whileInView={{
						opacity: 1,
						scale: 1,
						translateX: 0,
					}}
					transition={{
						duration: 1,
						delay: 0.5,
					}}
					style={{
						textShadow: "0px 5px 10px #555",
					}}
					className='text-2xl text-white md:text-4xl'>
					{title}
				</motion.p>
				<motion.h4
					initial={{
						opacity: 0,
					}}
					whileInView={{
						opacity: 1,
					}}
					transition={{
						duration: 1,
						delay: 0.5,
					}}
					className='my-1 font-bold text-yellow-300 md:my-4'>
					{release_date}
				</motion.h4>

				<motion.h3
					initial={{
						opacity: 0,
						translateX: 20,
					}}
					whileInView={{
						opacity: 1,
						translateX: 0,
					}}
					transition={{
						duration: 1,
						delay: 0.5,
					}}
					className='w-80 text-xs text-white sm:text-sm md:w-[calc(100%-40%)] md:text-base xl:w-[calc(100%-65%)]'>
					{overview}
				</motion.h3>
				<button
					onClick={showTitle}
					className='my-4 w-32 rounded-full border-none bg-amber-400 text-sm font-extrabold text-black outline-none transition-all delay-[1] ease-linear hover:scale-105 md:w-40 md:text-base lg:py-3'>
					Watch Now
				</button>
			</motion.div>
		</>
	);
}
