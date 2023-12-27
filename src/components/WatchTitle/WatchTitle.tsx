import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/Firebase";
import trash from "../../assets/images/icons8-trash-24.png";
import { SavedTitleType, WatchListTitle } from "../../pages/Layout/LayoutTypes";
import { useContext } from "react";
import { NameContext } from "../../pages/Layout/Layout";

export default function WatchTitle({
	title,
	id,
	poster_path,
	release_date,
	type,
	vote_average,
}: SavedTitleType) {
	const navigate = useNavigate();
	const titleContext = useContext(NameContext);
	const uid = auth.currentUser ? auth.currentUser?.uid : "";
	const userRef = doc(db, "watchlist", uid);
	const year = new Date(release_date).getFullYear();

	function navigateToShow(type: string, id: number) {
		type === "tv" ? navigate(`/tvshows/${id}`) : navigate(`/movies/${id}`);
	}

	async function removeTitle(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		{
			title,
			id,
			poster_path,
			release_date,
			type,
			vote_average,
			watched,
		}: WatchListTitle
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
				watched: watched,
			}),
		});
		titleContext?.getWatchlistData();
	}

	return (
		<>
			<div
				onClick={() => navigateToShow(type, id)}
				className='relative mx-auto mr-4 flex h-[300px] w-[155px] flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl md:mr-10 md:h-[300px] md:w-[155px]'>
				<img
					src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
					alt='image-cover'
					className='mx-auto mb-2 h-[231px] w-[154px] cursor-pointer rounded-lg md:h-auto md:w-auto'
				/>
				<h3
					className='sm:text-md line-clamp-1
					 text-ellipsis whitespace-pre-line text-left text-sm font-medium text-teal-500'>
					{title}
				</h3>
				<div className='flex w-full items-center justify-between'>
					<div className='flex flex-col items-start justify-center'>
						<div className='flex text-sm font-bold'>
							<h4 className='my-1 mr-2 text-xs font-normal text-white'>
								Rating:
							</h4>
							<h4 className='my-1 mr-2 text-xs font-normal text-white'>
								{vote_average === 0 ? "NA" : `${vote_average}✨`}
							</h4>
						</div>
						<h3 className='whitespace-nowrap text-xs font-semibold text-neutral-500'>
							{year}
						</h3>
					</div>
					<button
						onClick={(e) =>
							removeTitle(e, {
								title,
								id,
								poster_path,
								release_date,
								type,
								vote_average,
								watched: false,
							})
						}
						className='h-auto border-none bg-transparent p-0 outline-none'>
						<img src={trash} alt='title-menu' className='h-5 w-5' />
					</button>
				</div>
			</div>
		</>
	);
}
