export default function Loading() {
	const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

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
			<div className='mt-16 max-h-max min-h-[1000px] w-full scroll-smooth bg-neutral-900'>
				<div
					id='slideshow'
					className='relative flex h-[440px] w-full animate-pulse overflow-x-clip rounded-xl sm:px-[20px] md:h-[450px] xl:h-[640px] xl:px-[45px] xl:pl-72'>
					<div className='mr-1 flex h-[440px] w-full flex-shrink-0 flex-col justify-center rounded-2xl bg-neutral-600 pl-10 pt-16 text-left transition-all sm:pl-20 md:mt-0 md:h-[440px] md:w-[780px] md:pl-32 xl:h-[640px] xl:w-[1280px] xl:pl-44'></div>
					<div className='mr-1 flex h-[440px] w-full flex-shrink-0 flex-col justify-center rounded-2xl bg-neutral-600 pl-10 pt-16 text-left transition-all sm:pl-20 md:mt-0 md:h-[440px] md:w-[780px] md:pl-32 xl:h-[640px] xl:w-[1280px] xl:pl-44'></div>
				</div>
				<div className='px-[20px] xl:px-[45px]'>
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
			</div>
		</>
	);
}
