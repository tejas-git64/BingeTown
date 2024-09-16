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
			<div className='mb-2 flex h-auto w-full flex-col rounded-md border border-neutral-800 p-2'>
				<div className='flex w-full items-center'>
					<img
						src={
							avatar_path
								? `https://image.tmdb.org/t/p/original/${avatar_path}`
								: `https://api.dicebear.com/6.x/avataaars/svg?seed=${author}`
						}
						alt='user-img'
						className='mr-1 h-[40px] w-[40px] rounded-full bg-neutral-900 text-xs'
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
						<div>
							<h4 className='-mb-2 text-right text-xs font-medium text-gray-200'>
								Rating: {rating ? `${rating}` : "NA"}
							</h4>
							<p className='whitespace-nowrap text-[10px] font-normal text-gray-500'>
								{updated_at.split("").splice(0, 10)}
							</p>
						</div>
					</div>
				</div>
				<div className='flex h-full w-full flex-col items-start justify-start'>
					<p className='h-auto w-full text-justify text-xs font-normal text-gray-400'>
						{content}
					</p>
				</div>
			</div>
		</>
	);
}
