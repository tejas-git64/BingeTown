import { useNavigate } from "react-router-dom";
import { Movie } from '../../pages/Home/HomeTypes';
import { motion } from "framer-motion";
import { memo, useEffect, useState } from "react";

const isSameSlideShow = (prevProps: Movie, nextProps: Movie) => {
	return prevProps.id === nextProps.id;
};

const SlideShow = memo(
	({ backdrop_path, title, overview, id, release_date }: Movie) => {
		const navigate = useNavigate();
		const formatter = new Intl.DateTimeFormat("en-IN", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		const date = new Date(release_date);
		const [backwidth, setbackWidth] = useState("w780");
		function showTitle() {
			navigate(`/movies/${id}`);
		}

		function adjustBackdrop() {
			switch (true) {
				case innerWidth <= 480:
					setbackWidth("w780");
					break;
				case innerWidth <= 1280:
					setbackWidth("w1280");
					break;
				case innerWidth > 1280:
					setbackWidth("w1280");
					break;
				default:
					setbackWidth("original");
					break;
			}
		}

		useEffect(() => {
			adjustBackdrop();
		}, []);

		return (
			<>
				<motion.div
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/${backwidth}/${backdrop_path})`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundColor: "transparent",
						backgroundBlendMode: "overlay",
					}}
					className={`mx-0 flex h-[440px] w-[440px] flex-shrink-0 animate-slide flex-col justify-center pl-10 pt-16 text-left transition-all animation-delay-200 sm:pl-20 md:mt-0 md:h-[440px] md:w-[780px] md:pl-32 xl:h-[720px] xl:w-[1280px] xl:pl-44 2xl:h-[800px]`}>
					<p
						style={{
							textShadow: "0px 5px 10px #555",
						}}
						className='text-2xl text-white md:text-3xl'>
						{title}
					</p>
					<h4 className='my-1 text-xs font-bold text-yellow-300 md:my-2'>
						{formatter.format(date)}
					</h4>
					<h3 className='w-80 text-xs text-white sm:text-sm md:w-[calc(100%-40%)] xl:w-[calc(100%-65%)]'>
						{overview}
					</h3>
					<button
						onClick={showTitle}
						className='my-4 w-32 rounded-full border-none bg-amber-400 text-sm font-extrabold text-black outline-none transition-all delay-[1] ease-linear hover:scale-105 md:w-40 md:text-base lg:py-3'>
						Watch Now
					</button>
				</motion.div>
			</>
		);
	}
, isSameSlideShow);

export default SlideShow;
