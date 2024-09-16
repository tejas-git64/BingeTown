export default function Loading() {
	const arr = [{}, {}, {}, {}, {}, {}, {}, {}];

	const movieSections = [
		{
			heading: "Now Playing",
		},
		{
			heading: "Popular",
		},
	];

	return (
		<>
			<div className='mt-16 max-h-max min-h-[1000px] w-full scroll-smooth bg-neutral-900 px-[22px] xl:px-[45px]'>
				<div
					id='slideshow'
					className='relative flex h-[440px] w-screen animate-pulse overflow-x-hidden rounded-xl bg-neutral-600 md:h-[450px] xl:h-[640px] xl:pl-72'>
					<div className='mx-1 flex h-[440px] w-screen flex-shrink-0 animate-slide flex-col justify-center rounded-2xl pl-10 pt-16 text-left transition-all animation-delay-200 sm:pl-20 md:mt-0 md:h-[440px] md:w-[780px] md:pl-32 xl:h-[640px] xl:w-[1280px] xl:pl-44'>
						<p className='text-2xl text-white md:text-3xl'></p>
						<h4 className='my-1 text-xs font-bold text-yellow-300 md:my-2'></h4>
						<h3 className='w-80 text-xs text-white sm:text-sm md:w-[calc(100%-40%)] xl:w-[calc(100%-65%)]'></h3>
					</div>
				</div>
				{movieSections?.map(({ heading }: { heading: string }) => (
					<div
						key={Math.random()}
						className='titles mx-auto my-4 h-auto w-full animate-pulse md:h-auto'>
						<p className='mx-auto w-full cursor-pointer text-left text-lg font-extrabold text-white'>
							{heading}
						</p>
						<div
							id='latest'
							className='mx-auto flex h-[310px] items-center justify-start overflow-y-hidden overflow-x-scroll pt-2 md:h-auto'>
							{arr.map(() => (
								<div
									key={Math.random()}
									className='relative mr-2 flex h-[300px] w-[155px] flex-shrink-0 flex-col items-start justify-start overflow-hidden md:mr-6 md:h-[300px] md:w-[154px]'>
									<div className='mx-auto mb-2 h-[231px] w-[154px] cursor-pointer rounded-lg bg-neutral-600 transition-all delay-0 ease-in hover:scale-95'></div>
									<h3 className='h-[14px] w-full rounded-full bg-neutral-700'></h3>
									<div className='my-1 h-[10.5px] w-20 rounded-lg bg-neutral-700'></div>
									<h3 className='h-[10.5px] w-12 rounded-lg bg-neutral-700'></h3>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
