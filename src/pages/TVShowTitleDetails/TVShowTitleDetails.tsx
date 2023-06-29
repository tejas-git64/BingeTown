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
			<motion.div className='mx-auto mt-20 flex h-auto w-[calc(100%-10%)] flex-col overflow-x-hidden overflow-y-hidden pt-2 md:h-auto md:pb-4 xl:w-full xl:flex-row'>
				<div className='mx-auto hidden h-64 w-full px-4 lg:mt-10 lg:h-[1000px] xl:block xl:w-[500px]'>
					<p className='mb-4 text-lg text-teal-500'>Recommendations</p>
					<motion.ul
						variants={animationY}
						initial='initial'
						animate='animate'
						className='h-full overflow-y-scroll pr-3'>
						{tvRecommendations?.results?.map((recom) => (
							<motion.div key={recom.id} variants={animationY}>
								<Recommendation
									backdrop_path={recom.backdrop_path}
									name={recom.name}
									vote_average={recom.vote_average}
									first_air_date={recom.first_air_date}
									adult={false}
									genre_ids={[]}
									id={recom.id}
									origin_country={[]}
									original_language={""}
									original_name={""}
									overview={""}
									popularity={0}
									poster_path={""}
									show_vote_average={""}
									vote_count={0}
									title={""}
									isShow={true}
								/>
							</motion.div>
						))}
					</motion.ul>
				</div>
				<div className='mb-2 flex h-auto w-full flex-col xl:w-[900px] 2xl:w-[1200px]'>
					<p className='mx-auto mb-2 w-full text-left text-lg text-teal-400 md:text-xl xl:w-full'>
						{titleInfo?.name}
					</p>
					<iframe
						className='mx-auto h-60 w-full rounded-xl sm:h-80 md:h-96 lg:h-[550px] lg:w-full xl:w-[900px] 2xl:w-[1200px]'
						src={`https://www.youtube.com/embed/${vidID}` || ""}
						title='YouTube video player'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowFullScreen
					/>
					<motion.div className='mx-auto mb-2 mt-4 h-auto w-full'>
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
						<ul className='mx-auto -mt-2 flex w-full items-center py-2 xl:w-full'>
							<p className='mr-2 pl-0 text-sm text-gray-500 md:pr-4 md:text-base'>
								Genres:{" "}
							</p>
							<ul id='genres' className='my-1 flex overflow-x-scroll'>
								{titleInfo?.genres?.map((genre) => (
									<div
										key={genre.id}
										className='mr-1 whitespace-nowrap p-2 pl-0 text-sm font-extrabold text-gray-300 md:pr-6 md:text-base'>
										{genre.name}
									</div>
								))}
							</ul>
						</ul>
						<div className='mx-auto mb-3 w-full text-left text-teal-400 xl:w-full'>
							<div className='-mt-2 mb-2 flex w-full items-center justify-center'>
								<p className='mr-2 whitespace-nowrap text-sm md:text-base'>
									Release date:
								</p>
								<h3 className='-mb-1 w-full text-left text-xs font-bold text-gray-500 sm:-mb-0.5 md:text-base'>
									{titleInfo?.first_air_date}
								</h3>
							</div>
							<h3 className='mb-0.5 mt-3 text-sm font-bold md:text-base'>
								Summary
							</h3>
							<h3 className='w-full text-justify text-sm text-gray-500 sm:text-sm md:text-base'>
								{titleInfo?.overview}
							</h3>
						</div>
						<p className='mb-2 w-full text-left text-sm text-teal-400 xl:text-base'>
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
					<h4 className='mb-2 text-left font-bold text-teal-500'>
						Cast members
					</h4>
					<motion.ul
						id='cast'
						variants={animationX}
						initial='initial'
						animate='animate'
						className='mb-2 flex h-auto w-full overflow-x-scroll pb-4'>
						{showCast?.cast?.map((member) => (
							<motion.div key={member.id} variants={animationX}>
								<CastMember
									adult={false}
									gender={0}
									id={0}
									known_for_department={""}
									name={member.name}
									original_name={""}
									popularity={0}
									profile_path={member.profile_path}
									cast_id={0}
									character={member.character}
									credit_id={""}
									order={0}
								/>
							</motion.div>
						))}
					</motion.ul>
					<div className='h-auto w-full'>
						<div className='my-2 flex w-full items-center justify-between'>
							<p className='py-text-left text-base text-teal-500 lg:text-base'>
								Reviews
							</p>
							<button
								style={{
									border: "none",
									outline: "none",
								}}
								onClick={() => setShowComments(!showComments)}
								className='bg-transparent p-2 py-1 text-sm text-gray-400'>
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
										key={review.id}
										author={review.author}
										username={review.author_details.username}
										rating={review.author_details.rating}
										content={review.content}
										avatar_path={review.author_details.avatar_path}
										updated_at={review.updated_at}
										name={""}
										created_at={""}
										id={""}
										url={""}
									/>
								))
							) : (
								<p>No Comments</p>
							)}
						</motion.ul>
					</div>
				</div>
				<div className='h-84 mx-auto w-full pb-4 xl:mt-10 xl:h-[1000px] xl:w-[500px] xl:px-4'>
					<p className='mb-4 text-left text-sm text-teal-500 lg:text-lg xl:text-center'>
						Similar Titles
					</p>
					<motion.ul
						id='similar'
						initial='initial'
						animate='animate'
						className='grid h-auto grid-flow-col gap-6 overflow-x-scroll pb-4 xl:h-full xl:grid-flow-row xl:grid-cols-1 xl:gap-3 xl:gap-y-5 xl:overflow-x-hidden xl:overflow-y-scroll 2xl:grid-cols-2'>
						{similarShows?.results?.map((show) => (
							<SimilarTitle
								key={show.id}
								adult={false}
								backdrop_path={""}
								first_air_date={""}
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
								title={""}
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
