import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "../../pages/Home/HomeTypes";
import menu from "../../assets/images/icons8-menu-78.png";
import save from "../../assets/images/unsave.png";
import watchlist from "../../assets/images/icons8-list-50.png";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../../config/Firebase";

export default function MovieTitle({
	title,
	release_date,
	vote_average,
	poster_path,
	id,
}: Movie) {
	const [color, setColor] = useState("");
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const uid = auth.currentUser ? auth.currentUser?.uid : "";
	const savedDocRef = doc(db, "saved", uid);
	const watchDocRef = doc(db, "watchlist", uid);
	const year = new Date(release_date).getFullYear();
	function getRatingColor(rating: number) {
		let newColor = "";
		switch (true) {
			case rating === 0:
				newColor = "text-gray-600";
				break;
			case rating <= 5 && rating > 1:
				newColor = "text-red-500";
				break;
			case rating > 5 && rating < 7:
				newColor = "text-yellow-600";
				break;
			case rating > 7 && rating <= 10:
				newColor = "text-green-500";
				break;
			default:
				newColor = "text-gray-600";
				break;
		}
		setColor(newColor);
	}

	function showMovie(
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		navigate(`/movies/${id}`);
	}

	function revealMenu(
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
	) {
		e.stopPropagation();
		e.preventDefault();
		setShowMenu(true);
	}

	async function addToSavedList(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		movieid: number,
		title: string,
		poster_path: string,
		vote_average: number,
		release_date: string
	) {
		e.stopPropagation();
		e.preventDefault();
		setShowMenu(false);
		await updateDoc(savedDocRef, {
			savedtitles: arrayUnion({
				id: movieid,
				type: "movie",
				title: title,
				poster_path: poster_path,
				vote_average: vote_average,
				release_date: release_date,
			}),
		});
	}
	async function addToWatchList(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		movieid: number,
		title: string,
		poster_path: string,
		vote_average: number,
		release_date: string
	) {
		e.stopPropagation();
		e.preventDefault();
		setShowMenu(false);
		await updateDoc(watchDocRef, {
			watchlist: arrayUnion({
				id: movieid,
				type: "movie",
				watched: false,
				title: title,
				poster_path: poster_path,
				vote_average: vote_average,
				release_date: release_date,
			}),
		});
	}

	useEffect(() => {
		getRatingColor(typeof vote_average === "number" ? vote_average : 0);
	}, [vote_average]);

	return (
		<>
			<div
				onClick={showMovie}
				className='relative mx-auto mr-4 flex h-[300px] w-[155px] flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl md:mr-10 md:h-[300px] md:w-[155px]'>
				<img
					src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
					alt='movie-poster'
					className='mx-auto mb-2 h-[231px] w-[154px] cursor-pointer rounded-lg transition-all delay-0 ease-in hover:scale-95 md:h-auto md:w-auto'
				/>
				<h3
					className='sm:text-md line-clamp-1
					 text-ellipsis whitespace-pre-line text-left text-sm font-medium text-teal-500'>
					{title}
				</h3>
				<div className='flex w-full items-center justify-between'>
					<div className='flex flex-col items-start justify-center'>
						<div className='my-1 flex text-sm font-bold'>
							<h4 className='mr-2 text-xs font-normal text-white'>Rating:</h4>
							<h4 className={`${color} mt-[1px] text-xs`}>
								{vote_average === 0 ? "NA" : `${vote_average.toFixed(1)}✨`}
							</h4>
						</div>
						<h3 className='whitespace-nowrap text-xs font-semibold text-neutral-500'>
							{year}
						</h3>
					</div>
					<button
						onClick={revealMenu}
						style={{
							outline: "none",
						}}
						className='-mr-2 -mt-3 h-auto border-none bg-transparent p-0'>
						<img src={menu} alt='title-menu' className='h-6 w-6' />
					</button>
				</div>
				<div
					onMouseLeave={(e) => {
						e.preventDefault();
						setShowMenu(false);
					}}
					className={`${
						showMenu ? "absolute" : "hidden"
					} bottom-0 flex w-full flex-col rounded-md border border-neutral-700 bg-black py-0`}>
					<button
						onClick={(e) =>
							addToWatchList(
								e,
								id,
								title,
								poster_path,
								vote_average,
								release_date.toString()
							)
						}
						className='mx-auto flex w-full items-center justify-between rounded-none border-none bg-transparent p-1 px-1.5 outline-none hover:bg-neutral-700'>
						<h4 className='text-xs text-white'>Add to watchlist</h4>
						<img src={watchlist} alt='add' className='h-5 w-5 pr-0.5' />
					</button>
					<button
						onClick={(e) =>
							addToSavedList(
								e,
								id,
								title,
								poster_path,
								vote_average,
								release_date.toString()
							)
						}
						className='mx-auto flex w-full items-center justify-between rounded-none border-none bg-transparent p-1 px-1.5 outline-none hover:bg-neutral-700'>
						<h4 className='text-xs font-semibold text-white'>Save</h4>
						<img src={save} alt='save' className='h-5 w-5' />
					</button>
				</div>
			</div>
		</>
	);
}
