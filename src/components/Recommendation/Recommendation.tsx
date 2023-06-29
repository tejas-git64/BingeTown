import { Link } from "react-router-dom";
import { TVDiscover } from "../../pages/Home/HomeTypes";

export default function Recommendation({
	backdrop_path,
	name,
	id,
	title,
	isShow,
	vote_average,
	first_air_date,
}: TVDiscover) {
	return (
		<>
			<Link
				to={isShow ? `/tvshows/${id}` : `/movies/${id}`}
				className='mb-1 flex h-auto w-full items-center justify-between rounded-md bg-neutral-800 p-2'>
				<img
					src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
					alt='recommendation'
					className='mr-2 h-12 w-20 rounded-md text-xs overflow-clip'
				/>
				<div className='mr-2 flex h-12 w-44 flex-col items-start justify-start overflow-x-hidden'>
					<h3 className='whitespace-nowrap text-xs font-extrabold text-white'>
						{name || title}
					</h3>
					<h4 className='whitespace-nowrap text-xs font-semibold text-neutral-400'>
						Rating: {vote_average}⭐
					</h4>
				</div>
				<h4 className='w-auto text-xs font-bold text-neutral-400'>
					{first_air_date}
				</h4>
			</Link>
		</>
	);
}
