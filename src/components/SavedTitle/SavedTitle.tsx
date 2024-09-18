import { updateDoc, arrayRemove, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/Firebase";
import { SavedTitleType } from "../../pages/Layout/LayoutTypes";
import notbookmarked from "../../assets/images/not-bookmarked.png";
import { useContext } from "react";
import { NameContext } from "../../pages/Layout/Layout";

export default function SavedTitle({
	title,
	id,
	poster_path,
	release_date,
	type,
	vote_average,
}: SavedTitleType) {
	const navigate = useNavigate();
	const savedContext = useContext(NameContext);
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
		savedContext?.getSavedTitles();
	}

	return (
		<>
			<div
				onClick={() => navigateToShow(type, id)}
				className='relative mx-auto flex h-[300px] w-[154px] flex-shrink-0 flex-col items-start justify-start overflow-hidden hover:drop-shadow-2xl'>
				<img
					src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
					alt='image-cover'
					width={154}
					height={231}
					className='mx-auto h-[231px] w-[154px] cursor-pointer rounded-lg transition-all delay-0 ease-in hover:scale-95 md:h-auto md:w-auto'
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
					className='absolute right-1 top-1 rounded-xl rounded-bl-xl border-none bg-neutral-800 p-1 outline-none'>
					<img src={notbookmarked} alt='unsave' className='h-5 w-5' />
				</button>
				<div className='flex h-auto w-full flex-col items-start justify-center'>
					<p
						className='line-clamp-1
					 h-[24px] text-ellipsis whitespace-pre-line text-left text-[12px] font-semibold text-white'>
						{title}
					</p>
					<h4 className='mr-1  text-[10.5px] font-normal text-neutral-400'>
						Rating: {vote_average}/10
					</h4>
					<h4 className='whitespace-nowrap text-[10.5px] font-semibold text-neutral-300'>
						{year}
					</h4>
				</div>
			</div>
		</>
	);
}
