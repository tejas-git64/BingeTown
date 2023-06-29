import { useNavigate } from "react-router-dom";
import { TVDiscover, TVList } from "../../pages/Home/HomeTypes";
import TVTitle from "../TVTitle/TVTitle";
import { motion } from "framer-motion";

export default function TVSection({ shows, heading }: TVList) {
	const navigate = useNavigate();
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

	return (
		<>
			<motion.section
				variants={animation}
				initial='initial'
				animate='animate'
				className='mx-auto mt-4 h-[400px] w-full md:h-auto'>
				<motion.h2
					onClick={() => navigate("/tvshows")}
					className='mx-auto w-[calc(100%-3%)] cursor-pointer p-4 text-left text-xl font-extrabold text-fuchsia-600 sm:w-[calc(100%-8%)]'>
					{heading}
				</motion.h2>
				<motion.div
					id='latest'
					className='mx-auto flex h-[350px] w-[calc(100%-10%)] overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] md:pb-4 lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
					{shows &&
						shows?.map((show: TVDiscover) => (
							<motion.div key={show.id} variants={animation}>
								<TVTitle
									backdrop_path={""}
									first_air_date={show.first_air_date}
									genre_ids={[]}
									id={show.id}
									name={show.name}
									origin_country={[]}
									original_language={""}
									original_name={""}
									overview={""}
									popularity={0}
									poster_path={show.poster_path}
									vote_average={show.vote_average}
									show_vote_average={""}
									vote_count={0}
									adult={false}
									isShow={false}
									title={""}
								/>
							</motion.div>
						))}
				</motion.div>
			</motion.section>
		</>
	);
}
