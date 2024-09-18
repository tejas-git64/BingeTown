import loadingCircle from "../../assets/gifs/icons8-loading-circle.gif";

export default function DetailsPageFallback() {
	const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

	return (
		<>
			<div className='h-auto w-full bg-neutral-900'>
				<div className='mx-auto mt-12 flex h-auto flex-col overflow-x-hidden px-[20px] pt-2 md:mt-16 md:h-auto md:pb-4 xl:w-full xl:flex-row xl:px-6'>
					<div className='mx-auto hidden h-64 w-full px-4 lg:h-[1100px] xl:block xl:w-[500px]'>
						<p className='my-2 text-left text-sm text-white'>Recommendations</p>
						<ul className='h-full w-full overflow-y-scroll pr-3'>
							{arr?.map(() => (
								<div
									key={Math.random()}
									className='mb-1 flex h-auto w-full items-center justify-start rounded-md bg-neutral-800 hover:bg-neutral-700'>
									<div className='mr-6 h-[52px] w-[92px] scale-100 overflow-clip rounded-md bg-neutral-500 text-xs'></div>
									<div className='mr-2 flex h-12 w-44 flex-col items-start justify-center overflow-x-hidden'>
										<div className='mb-1 h-2.5 w-full rounded-full bg-neutral-500 text-xs'></div>
										<div className='h-2.5 w-20 rounded-full bg-neutral-600 text-xs'></div>
									</div>
								</div>
							))}
						</ul>
					</div>
					<div className='3xl:w-full mb-2 flex h-auto w-full flex-col xl:w-[900px] 2xl:w-[1100px]'>
						<p className='mb-2 h-3 w-[300px] rounded-full bg-neutral-500 text-left md:h-4'></p>
						<div className='mx-auto flex h-60 w-full items-center justify-center rounded-xl bg-black sm:h-80 md:h-96 lg:h-[560px] lg:w-full xl:w-[900px] 2xl:w-[1100px]'>
							<img
								src={loadingCircle}
								alt='loading'
								className='h-12 w-12 invert'
							/>
						</div>
						<div className='mx-auto h-auto w-full'>
							<ul
								id='videos'
								className='mt-2 flex h-32 w-full items-center justify-start overflow-x-scroll md:h-40'>
								{arr.map(() => (
									<p
										key={Math.random()}
										className='mr-2 h-28 w-40 flex-shrink-0 animate-pulse rounded-lg bg-neutral-600 md:h-36 md:w-52'></p>
								))}
							</ul>
							<ul
								id='genres'
								className='mx-auto my-2.5 flex w-full items-center xl:w-full'>
								<p className='mr-2 pb-[3px] pl-0 text-xs text-gray-500 md:text-sm'>
									Genres:{" "}
								</p>
								<ul id='genres' className='flex overflow-x-scroll'>
									<div className='mr-1 h-[12px] w-20 whitespace-nowrap rounded-full bg-neutral-600 pr-1 font-semibold md:h-[14px] md:pr-2'></div>
									<div className='mr-1 h-[12px] w-20 whitespace-nowrap rounded-full bg-neutral-600 pr-1 font-semibold md:h-[14px] md:pr-2'></div>
									<div className='mr-1 h-[12px] w-20 whitespace-nowrap rounded-full bg-neutral-600 pr-1 font-semibold md:h-[14px] md:pr-2'></div>
									<div className='mr-1 h-[12px] w-20 whitespace-nowrap rounded-full bg-neutral-600 pr-1 font-semibold md:h-[14px] md:pr-2'></div>
								</ul>
							</ul>
							<div className='mx-auto mb-3 w-full text-left text-teal-400 xl:w-full'>
								<p className='mr-2 mt-0.5 whitespace-nowrap text-xs text-gray-500 md:text-sm'>
									Release year:
								</p>
								<h3 className='mb-0.5 mt-2.5 text-xs font-bold text-white md:text-sm'>
									Summary
								</h3>
								<h3 className='w-full text-justify text-xs text-gray-500'></h3>
							</div>
						</div>
						<h4 className='mb-2 text-left text-xs font-bold text-white md:text-sm'>
							Cast members
						</h4>
						<ul id='cast' className='mb-2 flex h-auto w-full overflow-x-scroll'>
							{arr.map(() => (
								<div
									key={Math.random()}
									className='mr-5 flex h-44 w-24 flex-shrink-0 animate-pulse flex-col items-center justify-start rounded-lg bg-neutral-700 md:w-28'>
									<p className='h-34 md:h-34 mb-1 w-24 rounded-2xl md:w-28'></p>
									<p className='text-xs font-extrabold'></p>
									<h4 className='whitespace-pre-line text-xs font-bold text-yellow-300 md:text-xs'></h4>
								</div>
							))}
						</ul>
						<div className='mb-2 h-auto w-full'>
							<div className='my-2 flex w-full items-center justify-between'>
								<p className='text-left text-sm text-white'>Reviews</p>
								<button
									style={{
										border: "none",
										outline: "none",
									}}
									className='bg-transparent p-2 py-1 text-sm text-gray-400'>
									Hide comments
								</button>
							</div>
						</div>
					</div>
					<div className='h-84 mx-auto w-full pb-4 xl:h-[1100px] xl:w-[500px] xl:px-4'>
						<p className='text-right text-sm text-white md:my-2'>
							Similar Titles
						</p>
						<ul
							id='similar'
							className='flex h-auto place-items-end overflow-x-scroll pt-[23px] lg:grid xl:h-full xl:overflow-hidden xl:overflow-y-scroll'
							style={{
								gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
								gridTemplateRows: "repeat(auto-fill, minmax(260px, 1fr))",
								rowGap: "15px",
								columnGap: "10px",
							}}>
							{arr.map(() => (
								<div
									key={Math.random()}
									className='h-auto w-[154px] flex-shrink-0 animate-pulse'>
									<p className='h-[231px] w-[154px] rounded-xl bg-neutral-500 transition-all ease-in hover:scale-95'></p>
									<div className='mt-1 flex h-12 w-full flex-col items-start justify-start'>
										<div className='mb-1 h-[12px] w-full rounded-full bg-neutral-600 text-left'></div>
										<div className='h-[10px] w-20 rounded-full bg-neutral-600 text-left font-normal'></div>
									</div>
								</div>
							))}
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
