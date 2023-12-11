import { ReviewType } from "../../pages/MovieTitleDetails/TitleTypes";

export default function Review({
	author,
	content,
	updated_at,
	username,
	avatar_path,
	rating,
}: ReviewType) {
	return (
		<>
			<div className='mb-1 flex h-auto w-full flex-col rounded-xl bg-neutral-950 py-2 pt-3'>
				<div className='flex w-full items-center px-4'>
					<img
						src={
							avatar_path
								? `https://image.tmdb.org/t/p/original/${avatar_path}`
								: `https://api.dicebear.com/6.x/avataaars/svg?seed=${author}`
						}
						alt='user-img'
						className='mr-1 h-[47px] w-[50px] rounded-full bg-neutral-900 text-xs'
					/>
					<div className='flex w-full items-center justify-between'>
						<div className='-mt-1.5 flex w-44 flex-col items-start justify-center whitespace-nowrap pl-2'>
							<h3 className='whitespace-nowraps mr-2 line-clamp-1 text-ellipsis text-sm font-medium text-emerald-500'>
								{author}
							</h3>
							<h4 className='mr-4 text-ellipsis text-xs text-gray-500'>
								@{username}
							</h4>
						</div>
						<div className='text-left'>
							<h4 className='text-sm font-medium text-gray-400'>
								Rating: {rating ? `${rating}⭐` : "NA"}
							</h4>
							<p className='mt-0.5 whitespace-nowrap text-xs font-normal text-gray-500'>
								{updated_at.split("").splice(0, 10)}
							</p>
						</div>
					</div>
				</div>
				<div className='flex h-full w-full flex-col items-start justify-start px-4 py-2'>
					<div className='flex w-full items-center justify-start'></div>
					<p className='h-auto w-full text-justify text-xs text-gray-400 md:text-sm'>
						{content}
					</p>
				</div>
			</div>
		</>
	);
}
