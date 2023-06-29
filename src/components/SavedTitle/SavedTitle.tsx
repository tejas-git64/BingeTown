import { updateDoc, arrayRemove, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/Firebase";
import { SavedTitleType } from "../../pages/Layout/LayoutTypes";
import notbookmarked from "../../assets/images/not-bookmarked.png";

export default function SavedTitle({
	title,
	id,
	poster_path,
	release_date,
	type,
	vote_average,
}: SavedTitleType) {
	const navigate = useNavigate();
	const uid = auth.currentUser ? auth.currentUser?.uid : "";
	const userRef = doc(db, "saved", uid);

	function navigateToShow(type: string, id: number) {
		type === "tv" ? navigate(`/tvshows/${id}`) : navigate(`/movies/${id}`);
	}

	async function unSaveTitle(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		{ title, id, poster_path, release_date, type, vote_average }: SavedTitleType
	) {
		e.preventDefault();
		e.stopPropagation();
		await updateDoc(userRef, {
			savedtitles: arrayRemove({
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
				<button
					onClick={(e) =>
						unSaveTitle(e, {
							title,
							id,
							poster_path,
							release_date,
							type,
							vote_average,
						})
					}
					className='absolute right-0 top-0 rounded-none rounded-bl-xl rounded-tr-sm border-none bg-neutral-800 p-1.5 outline-none'>
					<img src={notbookmarked} alt='' className='h-5 w-5' />
				</button>
				<div className='flex h-auto w-full flex-col items-start justify-center px-2'>
					<p className='h-auto w-full overflow-x-hidden whitespace-nowrap py-1 text-left text-base font-bold text-teal-400'>
						{title}
					</p>
					<h4 className='h-auto w-full pb-2 text-left text-sm font-semibold text-gray-400'>
						Rating: {vote_average} ⭐
					</h4>
					<h4 className='h-auto w-full pb-2 text-left text-xs font-semibold text-gray-400'>
						{release_date}
					</h4>
				</div>
			</div>
		</>
	);
}
