import React, { memo, useState } from "react";
import { Suspense, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ContentType, TVDiscover } from "../../pages/Home/HomeTypes";
const TVTitle = React.lazy(() => import("../TVTitle/TVTitle"));
import { motion } from "framer-motion";
const Loading = React.lazy(() => import("../MovieSection/Loading"));

const isSameTVList = (prevProps: ContentType, nextProps: ContentType) => {
	return prevProps.heading === nextProps.heading;
};

const TVSection = memo(({ heading, uri }: ContentType) => {
	const [shows, setShows] = useState<TVDiscover[] | null>(null);
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
	async function fetchTVData() {
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
		setShows(data.results);
	}

	const tvsectionRef = useRef(null);

	useEffect(() => {
		const titleObserver = new IntersectionObserver(
			(enteries) => {
				enteries.forEach((entry) => {
					if (entry.isIntersecting) {
						shows === null && fetchTVData();
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tvsectionRef.current]);

	const TVSectionComponent = () => {
		return (
			<motion.div
				id='latest'
				className='mx-auto flex h-[310px] w-[calc(100%-5%)] overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] md:pb-4 lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
				{shows &&
					shows?.map((show: TVDiscover) => (
						<motion.div key={show.id} variants={animation}>
							<TVTitle key={show.id} {...show} />
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
				}, 0);
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
				id={heading}
				className='titles mx-auto h-auto w-full md:h-auto'>
				<motion.h2
					onClick={() => navigate("/tvshows")}
					className='mx-auto w-full cursor-pointer p-4 pl-3 text-left text-xl font-extrabold text-fuchsia-600 sm:w-[calc(100%-8%)]'>
					{heading}
				</motion.h2>
				<Suspense fallback={<Loading key={heading} />}>
					<DataComponent />
				</Suspense>
			</motion.section>
		</>
	);
}, isSameTVList);

export default TVSection;
