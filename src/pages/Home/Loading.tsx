export default function Loading() {
	const arr = [{}, {}, {}, {}, {}, {}, {}, {}];

	const movieSections = [
		{
			heading: "Latest Movies",
		},
		{
			heading: "Top Movies",
		},
	];

	return (
		<>
			<div className='min-h-fit w-full bg-neutral-900 pb-20'>
				<div
					id='slideshow'
					className='relative flex h-[440px] w-full md:h-[440px] xl:h-[720px]'>
					<div
						className={`mx-auto mr-2 flex h-[440px] w-full flex-shrink-0 animate-pulse flex-col justify-center bg-neutral-700 pt-16 text-left transition-all animation-delay-200 md:mt-0 md:h-[440px] xl:h-[720px]`}>
						<p className='bg-neutral-700 text-2xl text-white md:text-4xl'></p>
						<h4 className='my-1 bg-neutral-700 font-bold text-yellow-300 md:my-4'></h4>
						<h3 className='w-80 bg-neutral-700 text-xs text-white sm:text-sm md:w-[calc(100%-40%)] md:text-base xl:w-[calc(100%-65%)]'></h3>
					</div>
				</div>
				{movieSections?.map(() => (
					<div
						key={Math.random()}
						className='mx-auto my-4 flex h-auto w-full animate-pulse flex-col items-start justify-between overflow-hidden pl-3 sm:my-4 sm:w-[calc(100%-8%)] sm:pl-2 md:h-[390px] md:w-[calc(100%-7%)]'>
						<div className='my-2 mt-3 h-6 w-32 cursor-pointer rounded-full bg-neutral-600 sm:ml-2 sm:w-96 md:ml-3.5 md:mt-4'></div>
						<div
							id='latest'
							className='mx-auto my-4 flex h-[300px] w-full overflow-x-scroll pt-2 sm:mt-0 sm:w-[calc(100%-1%)] sm:pl-4 md:h-[335px] md:pl-2.5'>
							{arr.map(() => (
								<div
									key={Math.random()}
									className='my-1 mr-6 flex h-auto w-36 flex-shrink-0 flex-col items-start justify-start hover:drop-shadow-2xl md:m-2.5 md:mr-10 md:h-[300px] md:w-[154px] lg:mb-0 lg:ml-0'>
									<div className='mx-auto h-[231px] w-[154px] cursor-pointer rounded-lg bg-neutral-600 transition-all delay-0 ease-in hover:scale-95'></div>
									<h3 className='mt-3 h-[14px] w-full rounded-lg bg-neutral-600'></h3>
									<div className='flex h-[41px] w-full flex-col items-start justify-center'>
										<div className='my-2 h-[12px] w-20 rounded-lg bg-neutral-600'></div>
										<h3 className='h-3 w-12 rounded-lg bg-neutral-600'></h3>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</>
	);
}
