/* eslint-disable no-mixed-spaces-and-tabs */
import { Suspense, lazy, useContext, useEffect } from "react";
import { WatchListTitle } from "../Layout/LayoutTypes";
import { NameContext } from "../Layout/Layout";
const WatchTitle = lazy(() => import("../../components/WatchTitle/WatchTitle"));
import MovieShowFallback from "../Movies/MovieShowFalback";
import { motion } from "framer-motion";

export default function WatchList() {
	const watchContext = useContext(NameContext);

	useEffect(() => {
		watchContext?.getWatchlistData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const animation = {
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

	const WatchListComponent = () => {
		return (
			<>
				<motion.div
					variants={animation}
					animate='animate'
					exit='exit'
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
						gridTemplateRows: "repeat(auto-fill, minmax(200px, 1fr))",
						rowGap: "15px",
						columnGap: "15px",
					}}
					className='max-h-auto mb-6 mt-4 min-h-[500px] w-full'>
					{watchContext?.watchlist[0]?.watchlist.map(
						(title: WatchListTitle, i: number) => (
							<motion.div key={i} variants={animation}>
								<WatchTitle
									id={title.id}
									type={title.type}
									title={title.title}
									poster_path={title.poster_path}
									vote_average={title.vote_average}
									release_date={title.release_date}
								/>
							</motion.div>
						)
					)}
				</motion.div>
			</>
		);
	};

	const DataComponent = () => {
		if (!watchContext?.watchlist[0]?.watchlist) {
			throw new Promise<void>((resolve) => {
				setTimeout(resolve, 0);
			});
		} else {
			return <WatchListComponent />;
		}
	};

	return (
		<>
			<motion.div
				variants={animation}
				initial='initial'
				animate='animate'
				exit='exit'
				transition={{
					duration: 0.2,
				}}
				className='h-auto w-full bg-neutral-900 px-6 pb-2 text-left md:px-20 md:pl-[85px]'>
				<p className='mb-2 pt-20 text-xl font-bold text-teal-400 md:text-2xl'>
					WatchList
				</p>
				<Suspense fallback={<MovieShowFallback />}>
					<DataComponent />
				</Suspense>
			</motion.div>
		</>
	);
}
