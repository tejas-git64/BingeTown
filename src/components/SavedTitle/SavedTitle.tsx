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
	const year = new Date(release_date).getFullYear();
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
				className='relative mx-auto mr-4 flex h-[300px] w-[155px] flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl md:mr-10 md:h-[300px] md:w-[155px]'>
				<img
					src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
					alt='image-cover'
					className='mx-auto mb-2 h-[231px] w-[154px] cursor-pointer rounded-lg md:h-auto md:w-auto'
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
					<img src={notbookmarked} alt='unsave' className='h-5 w-5' />
				</button>
				<div className='flex h-auto w-full flex-col items-start justify-center'>
					<p
						className='sm:text-md line-clamp-1
					 text-ellipsis whitespace-pre-line text-left text-sm font-medium text-teal-500'>
						{title}
					</p>
					<h4 className='my-1 mr-2 text-xs font-normal text-white'>
						Rating: {vote_average} ⭐
					</h4>
					<h4 className='h-auto w-full pb-2 text-left text-xs font-semibold text-gray-400'>
						{year}
					</h4>
				</div>
			</div>
		</>
	);
}
