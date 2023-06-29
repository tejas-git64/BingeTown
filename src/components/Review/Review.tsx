import { Review } from "../../pages/MovieTitleDetails/TitleTypes";

export default function Review({
	author,
	content,
	updated_at,
	username,
	avatar_path,
	rating,
}: Review) {
	return (
		<>
			<div className='mb-1 flex h-auto w-full flex-col rounded-xl bg-neutral-800 py-2 pt-3'>
				<div className='flex w-full items-center px-4'>
					<img
						src={
							avatar_path
								? `https://image.tmdb.org/t/p/original/${avatar_path}`
								: `https://api.dicebear.com/6.x/avataaars/svg?seed=${author}`
						}
						alt='user-img'
						className='mr-2 h-[47px] w-[50px] rounded-full bg-neutral-900 text-xs'
					/>
					<div className='flex w-full items-center justify-between'>
						<div className='-mt-1 flex flex-col items-start justify-center px-2'>
							<h3 className='mr-2 font-extrabold text-emerald-500'>{author}</h3>
							<h4 className='mr-4 text-sm text-gray-500'>@{username}</h4>
						</div>
						<div className='text-left'>
							<h4 className='text-sm font-bold text-gray-300'>
								Rating: {rating ? `${rating}⭐` : "NA"}
							</h4>
							<p className='whitespace-nowrap text-sm text-neutral-500'>
								{updated_at.split("").splice(0, 10)}
							</p>
						</div>
					</div>
				</div>
				<div className='flex h-full w-full flex-col items-start justify-start px-4 py-2'>
					<div className='flex w-full items-center justify-start'></div>
					<p className='h-auto w-full text-justify text-xs text-gray-300 md:text-sm'>
						{content}
					</p>
				</div>
			</div>
		</>
	);
}
