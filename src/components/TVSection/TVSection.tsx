import React from "react";
import { Suspense, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TVDiscover, TVList } from "../../pages/Home/HomeTypes";
const TVTitle = React.lazy(() => import("../TVTitle/TVTitle"));
import { motion } from "framer-motion";
const Loading = React.lazy(() => import("../MovieSection/Loading"));

export default function TVSection({
	shows,
	heading,
	id,
	getMoviesorTVData,
}: TVList) {
	const navigate = useNavigate();
	const animation = {
		initial: {
			opacity: 1,
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				ease: "easeInOut",
				duration: 0.2,
			},
		},
	};

	const tvsectionRef = useRef(null);

	useEffect(() => {
		const titleObserver = new IntersectionObserver(
			(enteries) => {
				enteries.forEach((entry) => {
					if (entry.isIntersecting) {
						if (entry.target.id.includes("tv")) {
							getMoviesorTVData(entry.target.id);
						}
					}
				});
			},
			{
				rootMargin: "400px",
				threshold: 0.2,
			}
		);
		if (tvsectionRef.current) {
			titleObserver.observe(tvsectionRef.current);
		}
		// Cleanup the observer on component unmount
		return () => {
			titleObserver.disconnect();
		};
	}, [tvsectionRef.current]);

	const TVSectionComponent = () => {
		return (
			<motion.div
				id='latest'
				className='mx-auto flex h-[310px] w-[calc(100%-5%)] overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] md:pb-4 lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
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
		);
	};

	const DataComponent = () => {
		if (shows) {
			return <TVSectionComponent />;
		} else {
			throw new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 100);
			});
		}
	};

	return (
		<>
			<motion.section
				ref={tvsectionRef}
				variants={animation}
				initial='initial'
				animate='animate'
				id={id}
				className='titles mx-auto h-auto w-full md:h-auto'>
				<motion.h2
					onClick={() => navigate("/tvshows")}
					className='mx-auto w-full cursor-pointer p-4 pl-3 text-left text-xl font-extrabold text-fuchsia-600 sm:w-[calc(100%-8%)]'>
					{heading}
				</motion.h2>
				<Suspense fallback={<Loading key={id} />}>
					<DataComponent />
				</Suspense>
			</motion.section>
		</>
	);
}
