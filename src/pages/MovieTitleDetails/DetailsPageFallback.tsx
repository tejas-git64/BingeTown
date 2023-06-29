import loadingCircle from "../../assets/gifs/icons8-loading-circle.gif";

export default function DetailsPageFallback() {
	const arr = [{}, {}, {}, {}, {}, {}];

	return (
		<>
			<div className='h-auto w-full bg-neutral-900'>
				<div className='mx-auto mt-20 flex h-auto w-[calc(100%-10%)] flex-col overflow-x-hidden pt-2 md:h-auto md:pb-4 xl:w-full xl:flex-row'>
					<div className='mx-auto hidden h-64 w-full px-4 lg:mt-10 lg:h-[1000px] xl:block xl:w-[500px]'>
						<p className='mb-4 text-lg text-teal-500'>Recommendations</p>
						<ul className='h-full overflow-y-scroll pr-3'>
							{arr?.map(() => (
								<div className='00 mb-1 flex h-auto w-full animate-pulse items-center justify-between rounded-md bg-neutral-700 p-2'>
									<p className='mr-2 h-12 w-20 overflow-clip rounded-md text-xs'></p>
									<div className='mr-2 flex h-12 w-44 flex-col items-start justify-start overflow-x-hidden'>
										<h3 className='whitespace-nowrap text-xs font-extrabold text-white'></h3>
										<h4 className='whitespace-nowrap text-xs font-semibold text-neutral-400'></h4>
									</div>
									<h4 className='w-auto text-xs font-bold text-neutral-400'></h4>
								</div>
							))}
						</ul>
					</div>
					<div className='mb-2 flex h-auto w-full flex-col xl:w-[900px] 2xl:w-[1200px]'>
						<p className='mx-auto mb-5 w-full text-left text-lg text-teal-400 md:text-xl xl:w-full'></p>
						<div className='mx-auto flex h-60 w-full items-center justify-center rounded-xl bg-black sm:h-80 md:h-96 lg:h-[550px] lg:w-full xl:w-[900px] 2xl:w-[1200px]'>
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
									<p className='mr-2 h-32 w-40 flex-shrink-0 animate-pulse rounded-lg bg-neutral-700 md:w-52'></p>
								))}
							</ul>
							<ul
								id='genres'
								className='mx-auto -mt-1 mb-1 flex w-full items-center py-2 xl:w-full'>
								<p className='mr-2 pl-0 text-base text-gray-500 md:pr-4 md:text-base'>
									Genres:{" "}
								</p>
								<ul id='genres' className='my-1 flex overflow-x-scroll'>
									<div className='mr-4 w-24 animate-pulse whitespace-nowrap rounded-full bg-neutral-700 p-2 pb-4 pl-0 text-sm font-extrabold text-gray-300 md:pr-6 md:text-base'></div>
									<div className='mr-4 w-24 animate-pulse whitespace-nowrap rounded-full bg-neutral-700 p-2 pb-4 pl-0 text-sm font-extrabold text-gray-300 md:pr-6 md:text-base'></div>
									<div className='mr-4 w-24 animate-pulse whitespace-nowrap rounded-full bg-neutral-700 p-2 pb-4 pl-0 text-sm font-extrabold text-gray-300 md:pr-6 md:text-base'></div>
									<div className='mr-4 w-24 animate-pulse whitespace-nowrap rounded-full bg-neutral-700 p-2 pb-4 pl-0 text-sm font-extrabold text-gray-300 md:pr-6 md:text-base'></div>
								</ul>
							</ul>
							<div className='mx-auto mb-3 w-full text-left text-teal-400 xl:w-full'>
								<div className='-mt-2 mb-2 flex w-full items-center justify-center'>
									<p className='mr-2 whitespace-nowrap text-sm md:text-base'>
										Release date:
									</p>
									<h3 className='mt-0.5 w-full text-left text-xs font-bold text-gray-500 md:text-base'></h3>
								</div>
								<h3 className='mb-0.5 mt-3 text-sm font-bold md:text-base'>
									Summary
								</h3>
								<h3 className='w-full border-b-[1px] border-gray-700 pb-2 text-justify text-sm text-gray-500 sm:text-sm md:text-base'></h3>
							</div>
						</div>
						<h4 className='my-4 text-left font-bold text-teal-500'>
							Cast members
						</h4>
						<ul
							id='cast'
							className='mb-2 flex h-auto w-full overflow-x-scroll pb-6'>
							{arr.map(() => (
								<div className='mr-5 flex h-44 w-24 flex-shrink-0 animate-pulse flex-col items-center justify-start rounded-lg bg-neutral-700 md:w-28'>
									<p className='h-34 md:h-34 mb-1 w-24 rounded-2xl md:w-28'></p>
									<p className='text-xs font-extrabold'></p>
									<h4 className='whitespace-pre-line text-xs font-bold text-yellow-300 md:text-xs'></h4>
								</div>
							))}
						</ul>
						<div className='z-20 mb-2 h-auto w-full'>
							<div className='my-2 flex w-full items-center justify-between'>
								<p className='py-text-left text-base text-teal-500 lg:text-base'>
									Reviews
								</p>
								<button
									style={{
										border: "none",
										outline: "none",
									}}
									className='bg-transparent p-2 py-1 text-sm text-gray-400'>
									Comments
								</button>
							</div>
						</div>
					</div>
					<div className='h-84 mx-auto w-full pb-4 xl:mt-10 xl:h-[1000px] xl:w-[500px] xl:px-4'>
						<p className='mb-4 text-left text-sm text-teal-500 lg:text-lg xl:text-center'>
							Similar Titles
						</p>
						<ul
							id='similar'
							className='grid h-auto grid-flow-col gap-3 overflow-x-scroll pb-4 xl:h-full xl:grid-flow-row xl:grid-cols-1 xl:gap-3 xl:gap-y-5 xl:overflow-hidden xl:overflow-y-scroll 2xl:grid-cols-2'>
							{arr.map(() => (
								<div className='mx-auto h-52 w-32 flex-shrink-0 animate-pulse rounded-lg bg-neutral-700'>
									<p className='h-44 w-full rounded-xl'></p>
									<div className='mt-1 flex h-12 w-full flex-col items-start justify-start'>
										<p className='h-6 w-full overflow-x-hidden whitespace-nowrap text-left text-sm font-bold text-white'></p>
										<h4 className='h-6 w-full text-left text-xs font-semibold text-gray-400'></h4>
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
