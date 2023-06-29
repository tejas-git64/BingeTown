import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/Firebase";
import menu from "../../assets/images/icons8-menu-78.png";
import { SavedTitleType } from "../../pages/Layout/LayoutTypes";

export default function WatchTitle({
	title,
	id,
	poster_path,
	release_date,
	type,
	vote_average,
}: SavedTitleType) {
	const [showMenu, setShowMenu] = useState(false);
	const navigate = useNavigate();
	const uid = auth.currentUser ? auth.currentUser?.uid : "";
	const userRef = doc(db, "watchlist", uid);
	function navigateToShow(type: string, id: number) {
		type === "tv" ? navigate(`/tvshows/${id}`) : navigate(`/movies/${id}`);
	}

	function revealMenu(
		e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
	) {
		e.stopPropagation();
		e.preventDefault();
		0.5;
		setShowMenu(true);
	}

	async function removeTitle(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		{ title, id, poster_path, release_date, type, vote_average }: SavedTitleType
	) {
		e.preventDefault();
		e.stopPropagation();
		await updateDoc(userRef, {
			watchlist: arrayRemove({
				id: id,
				poster_path: poster_path,
				release_date: release_date,
				title: title,
				type: type,
				vote_average: vote_average,
			}),
		});
	}

	return (
		<>
			<div
				onClick={() => navigateToShow(type, id)}
				className='relative mx-auto h-auto w-44'>
				<img
					src={`https://image.tmdb.org/t/p/w300${poster_path}`}
					alt='image-cover'
					className='mb-2 h-60 w-full rounded-md bg-gray-400'
				/>
				<h3
					className='whitespace-pre-line
					 text-left font-bold text-teal-500'>
					{title}
				</h3>
				<div className='flex w-full items-center justify-between'>
					<div className='flex flex-col items-start justify-center'>
						<div className='mb-1 flex text-sm font-bold'>
							<h4 className='mr-2 text-white'>Rating:</h4>
							<h4 className='mt-[1px]'>
								{vote_average === 0 ? "NA" : `${vote_average}✨`}
							</h4>
						</div>
						<h3 className='whitespace-nowrap text-xs font-semibold text-gray-700'>
							{release_date}
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
					} bottom-0 flex w-full flex-col rounded-md bg-black py-2`}>
					<button
						onClick={(e) =>
							removeTitle(e, {
								title,
								id,
								poster_path,
								release_date,
								type,
								vote_average,
							})
						}
						className='mx-auto w-full rounded-none border-none bg-transparent py-1.5 text-center text-xs font-bold text-white outline-none hover:bg-neutral-700'>
						Remove from watchlist
					</button>
				</div>
			</div>
		</>
	);
}
