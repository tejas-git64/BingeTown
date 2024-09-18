import { TVSeason } from "../../pages/Home/HomeTypes";

export default function Season({ episode_count, name, poster_path }: TVSeason) {
	return (
		<>
			<div className='relative mr-6 h-full w-[154px] flex-shrink-0'>
				<img
					src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
					alt='series-img'
					width={154}
					height={231}
					className='h-[231px] w-[154px] rounded-xl'
				/>
				<div className='mt-1 flex h-12 w-full flex-col items-start justify-start'>
					<p className='h-6 w-full overflow-x-hidden whitespace-nowrap text-left text-sm font-bold text-white'>
						{name}
					</p>
					<h4 className='h-6 w-full text-left text-xs font-semibold text-gray-400'>
						Episodes: {episode_count}
					</h4>
				</div>
			</div>
		</>
	);
}
