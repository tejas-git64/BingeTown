/* eslint-disable no-mixed-spaces-and-tabs */
import { Suspense, lazy, useContext, useEffect } from "react";
import { WatchListTitle } from "../Layout/LayoutTypes";
import { NameContext } from "../Layout/Layout";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { onAuthStateChanged } from "firebase/auth";
const WatchTitle = lazy(() => import("../../components/WatchTitle/WatchTitle"));
import MovieShowFallback from "../Movies/MovieShowFalback";
import { motion } from "framer-motion";

export default function WatchList() {
	const watchContext = useContext(NameContext);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const savedRef = doc(db, "watchlist", uid);

				(async function getWatchData() {
					//Saved data
					const watchDoc = await getDoc(savedRef);
					const watchData = watchDoc.data();
					if (watchData) {
						watchContext?.watchlist[1](watchData);
					}
				})();
			}
		});
		return () => unsubscribe();
	}, [watchContext?.watchlist]);

	function fetchPromise() {
		return new Promise<void>((resolve) => {
			setTimeout(resolve, 2000);
		});
	}

	const pagevar = {
		initial: {
			opacity: 0,
			translateY: -20,
		},
		animate: {
			opacity: 1,
			translateY: 0,
		},
		exit: {
			opacity: 0,
			translateY: -20,
		},
		transition: {
			type: "spring",
			duration: 3,
			ease: "easeIn",
		},
	};

	const animation = {
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

	const WatchListComponent = () => {
		return (
			<>
				<motion.div
					variants={animation}
					animate='animate'
					exit='exit'
					transition={{
						delay: 0.5,
						duration: 1,
					}}
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
						gridTemplateRows: "repeat(auto-fill, minmax(200px, 1fr))",
						rowGap: "30px",
						columnGap: "30px",
					}}
					className='mb-16 mt-4 max-h-max min-h-[1000px] w-full gap-y-5 pl-4 sm:gap-y-8 sm:pl-0'>
					{watchContext?.watchlist[0]?.watchlist.map(
						(title: WatchListTitle) => (
							<motion.div key={title.id} variants={animation}>
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
			throw fetchPromise();
		} else {
			return <WatchListComponent />;
		}
	};

	return (
		<>
			<motion.div
				variants={pagevar}
				initial='initial'
				animate='animate'
				exit='exit'
				transition={{
					delay: 0.5,
					duration: 1,
				}}
				className='h-auto w-full bg-neutral-900 px-6 pb-2 text-left md:px-20'>
				<p className='mb-2 py-2 pt-24 text-xl font-bold text-teal-400 md:text-2xl'>
					WatchList
				</p>
				<Suspense fallback={<MovieShowFallback />}>
					<DataComponent />
				</Suspense>
			</motion.div>
		</>
	);
}
