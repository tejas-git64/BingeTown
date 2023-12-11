import { Cast } from "../../pages/MovieTitleDetails/TitleTypes";

export default function CastMember({
	id,
	profile_path,
	name,
	character,
}: Cast) {
	return (
		<>
			<div
				key={id}
				className='mr-5 flex h-full w-24 flex-shrink-0 flex-col items-center justify-start md:w-28'>
				<img
					src={`https://image.tmdb.org/t/p/w185/${profile_path}`}
					alt='cast-member'
					className='h-34 mb-1 w-24 rounded-2xl md:h-auto md:w-[200px]'
				/>
				<p className='text-xs font-semibold'>{name}</p>
				<h4 className='whitespace-pre-line text-xs font-normal text-yellow-300 md:text-xs'>
					{character}
				</h4>
			</div>
		</>
	);
}
