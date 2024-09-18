import { useDeferredValue, useEffect, useState } from "react";
import backarrow from "../../assets/images/icons8-arrow-50.png";
import { MultiSearch } from "../../components/Nav/Search";
import { useNavigate } from "react-router-dom";

export default function Search() {
	const [searchquery, setSearchQuery] = useState("");
	const searchval = useDeferredValue(searchquery);
	const navigate = useNavigate();
	const [searchResults, setSearchResults] = useState<MultiSearch | null>(null);

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

	function showDetails(mediaType: string, id: number) {
		mediaType === "tv" ? navigate(`/tvshows/${id}`) : navigate(`/movies/${id}`);
		setSearchResults(null);
	}

	async function getSearchResults() {
		const res = await fetch(
			`https://api.themoviedb.org/3/search/multi?query=${searchquery}&include_adult=false&language=en-US&page=1`,
			options
		);
		const data = await res.json();
		const results = data.results;
		const min: MultiSearch = results.filter(
			(res: { media_type: string }) => res.media_type !== "person"
		);
		setSearchResults(min);
	}

	useEffect(() => {
		if (searchval) {
			getSearchResults();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchval]);

	return (
		<>
			<div className='left-0 top-0 z-20 h-full w-full bg-neutral-900'>
				<div className='flex h-auto items-center justify-between border-b-[1px] border-neutral-900 p-3 px-4'>
					<input
						type='search'
						name='search-bar'
						value={searchval}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder='Search for movies or TV shows'
						className='mr-4 h-8 w-full rounded-md border-none bg-neutral-600 px-3 text-xs font-semibold text-white outline-none'
					/>
					<button
						onClick={() => navigate(-1)}
						style={{
							border: "none",
							outline: "none",
						}}
						className=' h-7 w-7 bg-transparent p-0'>
						<img
							src={backarrow}
							alt='back'
							className='h-[90%] w-[90%] sm:h-full sm:w-full'
						/>
					</button>
				</div>
				<div className='p-2 px-0'>
					<ul className='absolute mx-auto flex h-[calc(100dvh-10dvh)] w-full flex-col items-end justify-start overflow-y-scroll px-1'>
						{searchResults?.map((result) => (
							<div
								key={result.id}
								onClick={() => showDetails(result.media_type, result.id)}
								className='mx-auto mb-0.5 flex h-14 w-[calc(100%-5%)] items-center justify-between rounded-md bg-neutral-800 p-2 hover:cursor-pointer hover:bg-gray-800'>
								<div className='flex w-auto items-center justify-start overflow-x-hidden whitespace-nowrap'>
									<img
										src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
										alt='search-img'
										className='mr-4 h-10 w-16 rounded-lg text-xs'
									/>
									<div className='flex h-auto w-auto flex-col items-start justify-center'>
										<h3 className='w-52 text-left text-xs font-semibold text-white sm:w-full sm:text-sm'>
											{result.title || "Unknown title"}
										</h3>
										<div className='flex w-auto items-center justify-start'>
											<h4 className='mr-4 text-[10.5px] font-semibold text-gray-400 sm:text-xs'>
												Rating: {result.vote_average.toFixed(2)}/10
											</h4>
											<h4 className='text-xs font-semibold text-gray-400'>
												{result.release_date}
											</h4>
										</div>
									</div>
								</div>
								<p
									className={`${
										result.media_type === "tv"
											? "text-fuchsia-500"
											: "text-yellow-400"
									} py-2 pr-4 text-sm uppercase sm:text-base`}>
									{result.media_type}
								</p>
							</div>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}
