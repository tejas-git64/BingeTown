import { useState, useEffect } from "react";
import { TVDiscover } from "../../pages/Home/HomeTypes";
import { useNavigate } from "react-router-dom";
import menu from "../../assets/images/icons8-menu-78.png";
import save from "../../assets/images/bookmarked.png";
import watchlist from "../../assets/images/icons8-list-50.png";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";

export default function TVTitle({
	name,
	first_air_date,
	vote_average,
	poster_path,
	id,
}: TVDiscover) {
	const [color, setColor] = useState("");
	const navigate = useNavigate();
	const [showMenu, setShowMenu] = useState(false);
	const uid = auth.currentUser ? auth.currentUser?.uid : "";
	const savedDocRef = doc(db, "saved", uid);
	const watchDocRef = doc(db, "watchlist", uid);
	const year = new Date(first_air_date).getFullYear();
	function getRatingColor(rating: number) {
		switch (true) {
			case rating === 0:
				setColor("text-gray-600");
				break;
			case rating <= 5 && rating > 0:
				setColor("text-red-500");
				break;
			case rating > 5 && rating < 7:
				setColor("text-yellow-600");
				break;
			case rating > 7 && rating <= 10:
				setColor("text-green-500");
				break;
			default:
				setColor("text-gray-600");
				break;
		}
	}

	async function addToSavedList(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		showid: number
	) {
		e.stopPropagation();
		e.preventDefault();
		setShowMenu(false);
		await updateDoc(savedDocRef, {
			savedtitles: arrayUnion({
				id: showid,
				type: "tv",
				title: name,
				poster_path: poster_path,
				vote_average: vote_average,
				release_date: first_air_date,
			}),
		});
	}
	async function addToWatchList(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		showid: number
	) {
		e.stopPropagation();
		e.preventDefault();
		setShowMenu(false);
		await updateDoc(watchDocRef, {
			watchlist: arrayUnion({
				id: showid,
				type: "tv",
				watched: true,
				title: name,
				poster_path: poster_path,
				vote_average: vote_average,
				release_date: first_air_date,
			}),
		});
	}

	function revealMenu(
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
	) {
		e.stopPropagation();
		e.preventDefault();
		0.5;
		setShowMenu(true);
	}

	function showTVShow() {
		navigate(`/tvshows/${id}`);
	}

	useEffect(() => {
		getRatingColor(vote_average);
	}, [vote_average]);

	return (
		<>
			<div
				onClick={showTVShow}
				className='relative mx-auto mr-6 flex h-72 w-36 flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl md:mr-10 md:h-[300px] md:w-[154px]'>
				<img
					src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
					alt='movie-poster'
					className='mb-2 h-[231px] w-[154px] cursor-pointer text-ellipsis rounded-lg transition-all delay-100 ease-in hover:scale-90 md:h-[231px] md:w-[154px]'
				/>
				<h3
					className='line-clamp-1 whitespace-nowrap
					 text-left text-sm font-semibold text-teal-500 sm:whitespace-pre-line sm:text-sm'>
					{name}
				</h3>
				<div className='flex w-full items-center justify-between'>
					<div className='flex flex-col items-start justify-center'>
						<div className='my-1 flex text-sm font-bold'>
							<h4 className='mr-2 text-xs font-normal text-white'>Rating:</h4>
							<h4 className={`${color} mt-[1px] text-xs`}>
								{vote_average === 0 ? "NA" : `${vote_average.toFixed(1)} ✨`}
							</h4>
						</div>
						<h3 className='whitespace-nowrap text-xs font-semibold text-neutral-600'>
							{year}
						</h3>
					</div>
					<button
						onClick={revealMenu}
						style={{
							border: "none",
							outline: "none",
						}}
						className='-mr-2 h-auto bg-transparent p-0 '>
						<img src={menu} alt='title-menu' className='h-7 w-7' />
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
						onClick={(e) => addToWatchList(e, id)}
						className='mx-auto flex w-full items-center justify-between rounded-none border-none bg-transparent p-1 px-1.5 outline-none hover:bg-neutral-700'>
						<h4 className='text-xs text-white'>Add to watchlist</h4>
						<img src={watchlist} alt='add' className='h-5 w-5 pr-0.5' />
					</button>
					<button
						onClick={(e) => addToSavedList(e, id)}
						className='mx-auto flex w-full items-center justify-between rounded-none border-none bg-transparent p-1 px-1.5 outline-none hover:bg-neutral-700'>
						<h4 className='text-xs font-semibold text-white'>Save</h4>
						<img src={save} alt='save' className='h-5 w-5' />
					</button>
				</div>
			</div>
		</>
	);
}
