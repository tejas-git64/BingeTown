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
				className='mx-auto mr-6 flex h-80 w-40 flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl md:mr-10 md:h-auto md:w-44'>
				<img
					src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
					alt='movie-poster'
					className='mb-2 h-56 w-40 cursor-pointer rounded-lg transition-all delay-[1] ease-in hover:scale-90 md:h-64 md:w-44'
				/>
				<h3
					className='whitespace-pre-line
					 text-left font-bold text-teal-500'>
					{name}
				</h3>
				<div className='flex w-full items-center justify-between'>
					<div className='flex flex-col items-start justify-center'>
						<div className='mb-1 flex text-sm font-bold'>
							<h4 className='mr-2 text-white'>Rating:</h4>
							<h4 className={`${color} mt-[1px]`}>
								{vote_average === 0 ? "NA" : `${vote_average}✨`}
							</h4>
						</div>
						<h3 className='whitespace-nowrap text-xs font-semibold text-gray-700'>
							{first_air_date}
						</h3>
					</div>
					<button
						onClick={revealMenu}
						className='h-auto border-none bg-transparent p-0 outline-none'>
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
					} bottom-0 flex w-full flex-col rounded-md bg-black py-3`}>
					<button
						onClick={(e) => addToWatchList(e, id)}
						className='mx-auto mb-1 flex w-full justify-between rounded-none border-none bg-transparent py-1.5 outline-none hover:bg-neutral-700'>
						<h4 className='text-xs font-semibold text-white'>
							Add to watchlist
						</h4>
						<img src={watchlist} alt='add' className='h-5 w-5' />
					</button>
					<button
						onClick={(e) => addToSavedList(e, id)}
						className='mx-auto flex w-full justify-between rounded-none border-none bg-transparent py-1.5 outline-none hover:bg-neutral-700'>
						<h4 className='text-xs font-semibold text-white'>Save</h4>
						<img src={save} alt='save' className='h-5 w-5' />
					</button>
				</div>
			</div>
		</>
	);
}
