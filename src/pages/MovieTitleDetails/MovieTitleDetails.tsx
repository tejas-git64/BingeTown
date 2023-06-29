import { Suspense, lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cast, CastTotal, MovieTitleInfo, ReviewsTotal } from "./TitleTypes";
const Review = lazy(() => import("../../components/Review/Review"));
const Recommendation = lazy(
	() => import("../../components/Recommendation/Recommendation")
);
import { Movies, SimilarMovies } from "../Home/HomeTypes";
const SimilarTitle = lazy(
	() => import("../../components/SimilarTitle/SimilarTitle")
);
import playIcon from "../../assets/images/icons8-play-30.png";
const CastMember = lazy(() => import("../../components/CastMember/CastMember"));
import DetailsPageFallback from "./DetailsPageFallback";
import { motion } from "framer-motion";

export default function MovieTitleDetails() {
	const [titleInfo, setTitleInfo] = useState<MovieTitleInfo | null>(null);
	const [movieReviews, setMovieReviews] = useState<ReviewsTotal | null>(null);
	const [showComments, setShowComments] = useState(false);
	const [movieRecommendations, setMovieRecommendations] = useState<
		Movies["movies"] | null
	>(null);
	const [similarMovies, setSimilarMovies] = useState<SimilarMovies | null>(
		null
	);
	const [vidID, setVidID] = useState<string | undefined>(undefined);
	const [movieCast, setMovieCast] = useState<CastTotal | null>(null);
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
			`https://api.themoviedb.org/3/movie/${titleId}?append_to_response=videos`,
			options
		);
		const data = await res.json();
		data ? setTitleInfo(data) : null;
	}

	async function getTitleReviews() {
		//Fetch if movie
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${titleId}/reviews`,
			options
		);
		const data = await res.json();
		data ? setMovieReviews(data) : null;
	}

	async function getMovieRecommendations() {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${titleId}/recommendations`,
			options
		);
		const data = await res.json();
		data ? setMovieRecommendations(data.results) : null;
	}

	async function getSimilarMovies() {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${titleId}/similar`,
			options
		);
		const data = await res.json();
		data ? setSimilarMovies(data) : null;
	}

	async function getMovieCast() {
		const res = await fetch(
			`https://api.themoviedb.org/3/movie/${titleId}/credits?language=en-US`,
			options
		);
		const data = await res.json();
		data.cast.filter((cast: Cast) => cast.known_for_department === "Acting");
		setMovieCast(data);
	}

	useEffect(() => {
		getTitleData();
		getTitleReviews();
		getMovieRecommendations();
		getSimilarMovies();
		getMovieCast();
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
			<motion.div
				variants={animationY}
				initial='initial'
				animate='animate'
				className='mx-auto mt-20 flex h-auto w-[calc(100%-10%)] flex-col overflow-x-hidden pt-2 md:h-auto md:pb-4 xl:w-full xl:flex-row'>
				<div className='mx-auto hidden h-64 w-full px-4 lg:mt-10 lg:h-[1000px] xl:block xl:w-[500px]'>
					<p className='mb-4 text-lg text-teal-500'>Recommendations</p>
					<ul className='h-full overflow-y-scroll pr-3'>
						{movieRecommendations?.map((recom) => (
							<motion.div key={recom.id} variants={animationY}>
								<Recommendation
									backdrop_path={recom.backdrop_path}
									name={""}
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
									title={recom.title}
									isShow={false}
								/>
							</motion.div>
						))}
					</ul>
				</div>
				<div className='mb-2 flex h-auto w-full flex-col xl:w-[900px] 2xl:w-[1200px]'>
					<p className='mx-auto w-full text-left text-lg text-teal-400 md:text-xl xl:w-full'>
						{titleInfo?.title}
					</p>
					<iframe
						className='mx-auto h-60 w-full rounded-xl sm:h-80 md:h-96 lg:h-[550px] lg:w-full xl:w-[900px] 2xl:w-[1200px]'
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
							className='mt-2 flex h-32 w-full items-center justify-start overflow-x-scroll md:h-40'>
							{titleInfo?.videos?.results ? (
								titleInfo.videos.results.map((video) => (
									<motion.div key={video.id} variants={animationX}>
										<div className='relative mr-2 h-auto w-40 flex-shrink-0 md:w-52'>
											<img
												src={`http://img.youtube.com/vi/${video.key}/default.jpg`}
												alt='YouTube video thumbnail'
												className='h-28 w-full rounded-lg md:h-36'
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
						<ul
							id='genres'
							className='mx-auto -mt-1 mb-1 flex w-full items-center py-2 xl:w-full'>
							<p className='mr-2 pl-0 text-base text-gray-500 md:pr-4 md:text-base'>
								Genres:{" "}
							</p>
							<ul id='genres' className='my-1 flex overflow-x-scroll'>
								{titleInfo?.genres?.map((genre) => (
									<div
										key={genre.id}
										className='mr-1 whitespace-nowrap p-2 pb-1.5 pl-0 text-sm font-extrabold text-gray-300 md:pr-6 md:text-base'>
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
								<h3 className='mt-0.5 w-full text-left text-xs font-bold text-gray-500 md:text-base'>
									{titleInfo?.release_date}
								</h3>
							</div>
							<h3 className='mb-0.5 mt-3 text-sm font-bold md:text-base'>
								Summary
							</h3>
							<h3 className='w-full border-b-[1px] border-gray-700 pb-2 text-justify text-sm text-gray-500 sm:text-sm md:text-base'>
								{titleInfo?.overview}
							</h3>
						</div>
					</motion.div>
					<h4 className='my-4 text-left font-bold text-teal-500'>
						Cast members
					</h4>
					<motion.ul
						id='cast'
						variants={animationX}
						initial='initial'
						animate='animate'
						className='mb-2 flex h-auto w-full overflow-x-scroll'>
						{movieCast?.cast?.map((member) => (
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
					<div className='z-20 mb-2 h-auto w-full'>
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
						<ul
							className={`${
								showComments ? "flex" : "hidden"
							} h-auto w-full list-none flex-col items-center`}>
							{movieReviews?.results?.map((review) => (
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
							))}
						</ul>
					</div>
				</div>
				<div className='h-84 mx-auto w-full pb-4 xl:mt-10 xl:h-[1000px] xl:w-[500px] xl:px-4'>
					<p className='mb-4 text-left text-sm text-teal-500 lg:text-lg xl:text-center'>
						Similar Titles
					</p>
					<ul
						id='similar'
						className='grid h-auto grid-flow-col gap-6 overflow-x-scroll pb-4 xl:h-full xl:grid-flow-row xl:grid-cols-1 xl:gap-3 xl:gap-y-5 xl:overflow-hidden xl:overflow-y-scroll 2xl:grid-cols-2'>
						{similarMovies?.results.map((movie) => (
							<SimilarTitle
								key={movie.id}
								adult={false}
								backdrop_path={""}
								first_air_date={""}
								genre_ids={[]}
								id={movie.id}
								name={""}
								origin_country={[]}
								original_language={""}
								original_name={""}
								overview={""}
								popularity={0}
								poster_path={movie.poster_path}
								vote_average={movie.vote_average}
								show_vote_average={""}
								vote_count={0}
								title={movie.title}
								isShow={false}
							/>
						))}
					</ul>
				</div>
			</motion.div>
		);
	};

	const DataComponent = () => {
		if (!titleInfo || !movieReviews || !movieRecommendations || !movieCast) {
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
