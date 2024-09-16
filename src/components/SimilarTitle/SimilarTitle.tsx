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
				className='h-auto w-[154px] flex-shrink-0'>
				<img
					src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
					alt='poster'
					width={154}
					height={231}
					className='h-[231px] w-[154px] rounded-xl transition-all ease-in hover:scale-95'
				/>
				<div className='mt-1 flex h-12 w-full flex-col items-start justify-start'>
					<p className='w-full overflow-x-hidden whitespace-nowrap text-left text-xs text-white'>
						{name || title}
					</p>
					<h4 className='h-6 w-full text-left text-[10px] font-normal text-gray-400'>
						Rating: {vote_average ? `${vote_average.toFixed(1)}/10` : "NA"}
					</h4>
				</div>
			</Link>
		</>
	);
}
