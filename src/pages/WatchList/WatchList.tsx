/* eslint-disable no-mixed-spaces-and-tabs */
import { Suspense, lazy, useEffect, useState } from "react";
import { WatchListTitle, WatchListType } from "../Layout/LayoutTypes";
const WatchTitle = lazy(() => import("../../components/WatchTitle/WatchTitle"));
import MovieShowFallback from "../Movies/MovieShowFalback";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";

export default function WatchList() {
	const [watchList, setWatchList] = useState<WatchListType | null>(null);
	const animation = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				staggerChildren: 0.05,
				ease: "easeInOut",
				duration: 0.5,
			},
		},
	};
	const getWatchlistData = () => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const savedRef = doc(db, "watchlist", uid);
				(async function getWatchData() {
					//Saved data
					const watchDoc = await getDoc(savedRef);
					const watchData = watchDoc.data();
					if (watchData) {
						setWatchList(watchData);
					}
				})();
			}
		});
		return () => unsubscribe();
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const watchlistRef = doc(db, "watchlist", uid);
				(async function getListData() {
					//Watchlist data
					const watchlistDoc = await getDoc(watchlistRef);
					const watchlistData = watchlistDoc.data();
					if (watchlistData) {
						setWatchList(watchlistData);
					}
				})();
			}
		});
		return () => unsubscribe();
	}, []);
	useEffect(() => {
		getWatchlistData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const WatchListComponent = () => {
		return (
			<>
				<motion.div
					variants={animation}
					initial='initial'
					animate='animate'
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
						gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
					}}
					className='mb-6 mt-4 h-auto gap-x-4 gap-y-4 md:gap-x-6'>
					{watchList?.watchlist.map((title: WatchListTitle, i: number) => (
						<motion.div key={i} variants={animation} className='mx-auto w-min'>
							<WatchTitle
								id={title.id}
								type={title.type}
								title={title.title}
								poster_path={title.poster_path}
								vote_average={title.vote_average}
								release_date={title.release_date}
							/>
						</motion.div>
					))}
				</motion.div>
			</>
		);
	};

	const DataComponent = () => {
		if (!watchList?.watchlist) {
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
				className='max-h-auto h-full w-full bg-neutral-900 px-5 pb-2 pt-12 text-left md:px-6'>
				<p className='my-4 py-2 text-base font-bold text-white md:text-lg'>
					WatchList
				</p>
				<Suspense fallback={<MovieShowFallback />}>
					<DataComponent />
				</Suspense>
			</motion.div>
		</>
	);
}
