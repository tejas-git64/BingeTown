import { Link } from "react-router-dom";
import { TVDiscover } from "../../pages/Home/HomeTypes";

export default function SimilarTitle({
	name,
	id,
	title,
	poster_path,
	isShow,
	vote_average,
}: TVDiscover) {
	return (
		<>
			<Link
				to={isShow ? `/tvshows/${id}` : `/movies/${id}`}
				className='mx-auto h-auto w-32 flex-shrink-0'>
				<img
					src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
					alt='poster'
					className='h-[200px] w-[154px] rounded-xl transition-all ease-in hover:scale-95'
				/>
				<div className='mt-1 flex h-12 w-full flex-col items-start justify-start'>
					<p className='w-full overflow-x-hidden whitespace-nowrap text-left text-xs text-teal-400'>
						{name || title}
					</p>
					<h4 className='h-6 w-full text-left text-xs font-semibold text-gray-400'>
						Rating: {vote_average ? `${vote_average.toFixed(1)}` : "NA"}
					</h4>
				</div>
			</Link>
		</>
	);
}
