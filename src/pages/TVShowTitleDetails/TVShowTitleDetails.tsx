/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import {
	Cast,
	CastTotal,
	ReviewsTotal,
	TVTitleInfo,
} from "../MovieTitleDetails/TitleTypes";
const Review = lazy(() => import("../../components/Review/Review"));
import { TrendingTV } from "../Home/HomeTypes";
const Recommendation = lazy(
	() => import("../../components/Recommendation/Recommendation")
);
const SimilarTitle = lazy(
	() => import("../../components/SimilarTitle/SimilarTitle")
);
const Season = lazy(() => import("../../components/Season/Season"));
import playIcon from "../../assets/images/icons8-play-30.png";
const CastMember = lazy(() => import("../../components/CastMember/CastMember"));
import DetailsPageFallback from "../MovieTitleDetails/DetailsPageFallback";
import { motion } from "framer-motion";

export default function TVShowTitleDetails() {
	const [titleInfo, setTitleInfo] = useState<TVTitleInfo | null>(null);
	const [showReviews, setShowReviews] = useState<ReviewsTotal | null>(null);
	const [showComments, setShowComments] = useState(false);
	const [tvRecommendations, setTvRecommendations] = useState<TrendingTV | null>(
		null
	);
	const [similarShows, setSimilarShows] = useState<TrendingTV | null>(null);
	const [vidID, setVidID] = useState<string | undefined>(undefined);
	const [showCast, setShowCast] = useState<CastTotal | null>(null);
	const { titleId } = useParams();
	const controller = new AbortController();
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

	async function getTitleData() {
		//Fetch if movie
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${titleId}?append_to_response=videos`,
			options
		);
		const data = await res.json();
		data ? setTitleInfo(data) : null;
	}

	async function getTitleReviews() {
		//Fetch if movie
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${titleId}/reviews`,
			options
		);
		const data = await res.json();
		data ? setShowReviews(data) : null;
	}

	async function getTitleRecommendations() {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${titleId}/recommendations`,
			options
		);
		const data = await res.json();
		data ? setTvRecommendations(data) : null;
	}

	async function getSimilarTitles() {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${titleId}/similar`,
			options
		);
		const data = await res.json();
		data ? setSimilarShows(data) : null;
	}

	async function getShowCast() {
		const res = await fetch(
			`https://api.themoviedb.org/3/tv/${titleId}/credits?language=en-US`,
			options
		);
		const data = await res.json();
		data.cast.filter((cast: Cast) => cast.known_for_department === "Acting");
		setShowCast(data);
	}

	useEffect(() => {
		getTitleData();
		getTitleReviews();
		getSimilarTitles();
		getTitleRecommendations();
		getShowCast();
		return () => {
			controller.abort();
		};
	}, [titleId]);

	useEffect(() => {
		titleInfo?.videos?.results && setVidID(titleInfo.videos.results[0]?.key);
	}, [titleInfo?.videos.results]);

	function fetchFact() {
		return new Promise<void>((resolve) => {
			setTimeout(resolve, 100);
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

	const animationY = {
		initial: {
			y: "-10rem",
			opacity: 0,
		},
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				ease: "easeInOut",
				duration: 1,
			},
		},
	};

	const animationX = {
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

	const DetailsComponent = () => {
		return (
			<motion.div className='mx-auto mt-16 flex h-auto flex-col overflow-x-hidden px-[20px] pt-2 md:mt-20 md:h-auto md:pb-4 xl:w-full xl:flex-row xl:px-6'>
				<div className='mx-auto hidden h-64 w-full px-4 lg:h-[1100px] xl:block xl:w-[500px]'>
					<p className='my-2 text-left text-sm text-white'>Recommendations</p>
					<motion.ul
						variants={animationY}
						initial='initial'
						animate='animate'
						className='h-full overflow-y-scroll pr-3'>
						{tvRecommendations?.results?.map((recom) => (
							<motion.div key={recom.id} variants={animationY}>
								<Recommendation
									title={""}
									show_vote_average={""}
									{...recom}
									isShow={true}
								/>
							</motion.div>
						))}
					</motion.ul>
				</div>
				<div className='3xl:w-full mb-2 flex h-auto w-full flex-col xl:w-[900px] 2xl:w-[1100px]'>
					<p className='mb-2 w-full text-left text-base text-white md:text-xl xl:w-full'>
						{titleInfo?.name}
					</p>
					<iframe
						className='mx-auto h-60 w-full rounded-xl sm:h-80 md:h-96 lg:h-[550px] lg:w-full xl:w-[900px] 2xl:w-full'
						src={`https://www.youtube.com/embed/${vidID}` || ""}
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowFullScreen
					/>
					<motion.div className='mx-auto h-auto w-full'>
						<motion.div
							id='videos'
							variants={animationX}
							initial='initial'
							animate='animate'
							className='flex h-24 w-full items-center justify-start overflow-x-scroll md:h-40'>
							{titleInfo?.videos?.results ? (
								titleInfo.videos.results.map((video) => (
									<motion.div key={video.id} variants={animationX}>
										<div className='relative mr-2 h-auto w-40 flex-shrink-0 md:w-52'>
											<img
												src={`http://img.youtube.com/vi/${video.key}/default.jpg`}
												alt='YouTube video thumbnail'
												className='h-28 w-full rounded-lg md:h-32'
											/>
											<button
												onClick={() => setVidID(video.key)}
												className='absolute left-[37%] top-[30%] h-auto w-auto bg-gray-800 p-2 md:left-[40%] md:top-[35%]'>
												<img src={playIcon} alt='play' className='w-6' />
											</button>
										</div>
									</motion.div>
								))
							) : (
								<p>This title has no videos</p>
							)}
						</motion.div>
						<ul className='mx-auto my-2.5 flex w-full items-center xl:w-full'>
							<p className='mr-2 pb-[3px] pl-0 text-xs text-gray-500 md:text-sm'>
								Genres:{" "}
							</p>
							<ul id='genres' className='flex overflow-x-scroll'>
								{titleInfo?.genres?.map((genre) => (
									<div
										key={genre.id}
										className='mr-1 whitespace-nowrap pr-1 text-xs font-semibold text-gray-300 md:pr-2 md:text-sm'>
										{genre.name}
									</div>
								))}
							</ul>
						</ul>
						<div className='mx-auto mb-2 w-full text-left text-white xl:w-full'>
							<div className='-mt-2 mb-2 flex w-full items-center justify-center'>
								<p className='mr-2 mt-0.5 whitespace-nowrap text-xs text-gray-500 md:text-sm'>
									Release date:
								</p>
								<h3 className='mt-0.5 w-full text-left text-xs font-bold text-gray-300 md:text-sm'>
									{titleInfo?.first_air_date}
								</h3>
							</div>
							<h3 className='mb-0.5 mt-2.5 text-xs font-bold text-white md:text-sm'>
								Summary
							</h3>
							<h3 className='w-full text-justify text-xs text-gray-500'>
								{titleInfo?.overview}
							</h3>
						</div>
						<p className='mb-2 w-full text-left text-xs text-white xl:text-sm'>
							Seasons
						</p>
						<motion.div
							id='seasons'
							variants={animationX}
							initial='initial'
							animate='animate'
							className='flex h-auto w-full items-center justify-start overflow-x-scroll pb-4'>
							{titleInfo?.seasons ? (
								titleInfo.seasons.map((series) => (
									<motion.div key={series.id} variants={animationX}>
										<Season
											key={series.id}
											poster_path={series.poster_path}
											name={series.name}
											episode_count={series.episode_count}
											id={0}
										/>
									</motion.div>
								))
							) : (
								<p>This series has no upcoming seasons</p>
							)}
						</motion.div>
					</motion.div>
					<h4 className='mb-2 text-left text-xs font-bold text-white md:text-sm'>
						Cast members
					</h4>
					<motion.ul
						id='cast'
						variants={animationX}
						initial='initial'
						animate='animate'
						className='mb-2 flex h-auto w-full overflow-x-scroll'>
						{showCast?.cast?.map((member) => (
							<motion.div key={member.id} variants={animationX}>
								<CastMember {...member} order={0} />
							</motion.div>
						))}
					</motion.ul>
					<div className='h-auto w-full'>
						<div className='my-2 flex w-full items-center justify-between'>
							<p className='text-left text-sm text-white'>Reviews</p>
							<button
								style={{
									border: "none",
									outline: "none",
								}}
								onClick={() => setShowComments(!showComments)}
								className='bg-transparent px-0 py-1 text-xs text-gray-400'>
								{showComments ? "Hide Comments" : "Show Comments"}
							</button>
						</div>
						<motion.ul
							className={`${
								showComments ? "flex" : "hidden"
							} w-full list-none flex-col items-center`}>
							{showReviews?.results ? (
								showReviews.results.map((review) => (
									<Review
										name={""}
										username={""}
										avatar_path={""}
										rating={null}
										key={review.id}
										{...review}
									/>
								))
							) : (
								<p>No Comments</p>
							)}
						</motion.ul>
					</div>
				</div>
				<div className='h-84 mx-auto w-full pb-4 xl:h-[1100px] xl:w-[500px] xl:px-4'>
					<p className='text-right text-sm text-white md:my-2'>
						Similar Titles
					</p>
					<motion.ul
						id='similar'
						initial='initial'
						animate='animate'
						style={{
							gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
							gridTemplateRows: "repeat(auto-fill, minmax(260px, 1fr))",
							rowGap: "15px",
							columnGap: "10px",
						}}
						className='flex h-auto place-items-end overflow-x-scroll pt-[23px] lg:grid xl:h-full xl:overflow-hidden xl:overflow-y-scroll'>
						{similarShows?.results?.map((show) => (
							<SimilarTitle
								title={""}
								show_vote_average={""}
								key={show.id}
								{...show}
								isShow={true}
							/>
						))}
					</motion.ul>
				</div>
			</motion.div>
		);
	};

	const DataComponent = () => {
		if (!titleInfo || !showReviews || !tvRecommendations || !showCast) {
			throw fetchFact();
		} else {
			return <DetailsComponent />;
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
				className='h-auto w-full bg-neutral-900'>
				<Suspense fallback={<DetailsPageFallback />}>
					<DataComponent />
				</Suspense>
			</motion.div>
		</>
	);
}
