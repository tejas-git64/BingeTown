export default function Loading() {
	const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

	const movieSections = [
		{
			heading: "Latest Movies",
		},
		{
			heading: "Top Movies",
		},
		{
			heading: "Upcoming Movies",
		},
	];

	const genres = [
		{
			id: 28,
			heading: "Action",
		},
		{
			id: 12,
			heading: "Adventure",
		},
		{
			id: 16,
			heading: "Animation",
		},
		{
			id: 35,
			heading: "Comedy",
		},
		{
			id: 80,
			heading: "Crime",
		},
		{
			id: 99,
			heading: "Documentary",
		},
		{
			id: 18,
			heading: "Drama",
		},
		{
			id: 10751,
			heading: "Family",
		},
		{
			id: 14,
			heading: "Fantasy",
		},
		{
			id: 36,
			heading: "History",
		},
		{
			id: 27,
			heading: "Horror",
		},
		{
			id: 10402,
			heading: "Music",
		},
		{
			id: 9648,
			heading: "Mystery",
		},
		{
			id: 10749,
			heading: "Romance",
		},
		{
			id: 878,
			heading: "Science Fiction",
		},
		{
			id: 53,
			heading: "Thriller",
		},
		{
			id: 10752,
			heading: "War",
		},
	];

	const tvSections = [
		{
			heading: "Currently Airing TV Shows",
		},
		{
			heading: "On the Air",
		},
		{
			heading: "Popular TV Shows",
		},
		{
			heading: "Top Rated TV Shows",
		},
	];

	return (
		<>
			<div className='h-auto w-full bg-neutral-900 pb-20'>
				<div
					id='slideshow'
					className='flex h-[500px] w-full overflow-x-scroll bg-neutral-700 xl:h-[600px] 2xl:h-[700px] animate-pulse'>
					<div
						className={`md:pl-30 mr-4 flex h-full w-full flex-shrink-0 flex-col justify-center bg-contain bg-center bg-no-repeat pl-10 pt-16 text-left sm:pl-20 md:mt-0 md:bg-cover md:pl-32 xl:pl-44`}>
						<p className='bg-neutral-700 text-2xl text-white md:text-4xl'></p>
						<h4 className='my-1 bg-neutral-700 font-bold text-yellow-300 md:my-4'></h4>
						<h3 className='w-80 bg-neutral-700 text-xs text-white sm:text-sm md:w-[calc(100%-40%)] md:text-base xl:w-[calc(100%-65%)]'></h3>
					</div>
				</div>
				{movieSections?.map((movie) => (
					<section
						id='latest'
						className='mx-auto mt-4 h-[400px] w-full md:h-auto'>
						<h2 className='mx-auto w-[calc(100%-3%)] cursor-pointer p-4 text-left text-xl font-extrabold text-amber-500 sm:w-[calc(100%-8%)]'>
							{movie.heading}
						</h2>
						<div
							id='latest'
							className='mx-auto flex h-[350px] w-[calc(100%-10%)] overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] md:pb-4 lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
							{arr?.map(() => (
								<div className='mx-auto mr-6 flex h-80 w-40 animate-pulse flex-shrink-0 flex-col items-start justify-start overflow-hidden md:mr-10 md:h-auto md:w-44'>
									<p className='mb-2 h-56 w-40 rounded-lg bg-neutral-700 transition-all delay-[2] ease-in md:h-64 md:w-44' />
									<h3
										className='whitespace-pre-line
					 text-left font-bold text-teal-500'></h3>
									<div className='mb-1 flex text-sm font-bold'>
										<h4 className='mr-2 text-white'></h4>
										<h4 className={` mt-[1px]`}></h4>
									</div>
									<h3 className='whitespace-nowrap text-xs font-semibold text-gray-700'></h3>
								</div>
							))}
						</div>
					</section>
				))}
				{tvSections?.map((show) => (
					<section
						id='latest'
						className='mx-auto mt-4 h-[400px] w-full md:h-auto'>
						<h2 className='mx-auto w-[calc(100%-3%)] cursor-pointer p-4 text-left text-xl font-extrabold text-amber-500 sm:w-[calc(100%-8%)]'>
							{show.heading}
						</h2>
						<div
							id='latest'
							className='mx-auto flex h-[350px] w-[calc(100%-10%)] overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] md:pb-4 lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
							{arr?.map(() => (
								<div className='mx-auto mr-6 flex h-80 w-40 animate-pulse flex-shrink-0 flex-col items-start justify-start overflow-hidden md:mr-10 md:h-auto md:w-44'>
									<p className='mb-2 h-56 w-40 rounded-lg bg-neutral-700 transition-all delay-[2] ease-in md:h-64 md:w-44' />
									<h3
										className='whitespace-pre-line
					 text-left font-bold text-teal-500'></h3>
									<div className='mb-1 flex text-sm font-bold'>
										<h4 className='mr-2 text-white'></h4>
										<h4 className={` mt-[1px]`}></h4>
									</div>
									<h3 className='whitespace-nowrap text-xs font-semibold text-gray-700'></h3>
								</div>
							))}
						</div>
					</section>
				))}
				<p className='mx-auto -mb-4 mt-10 w-[calc(100%-10%)] py-3 text-left text-2xl text-red-400 md:w-[calc(100%-9.8%)]'>
					Get Movies by Genres
				</p>
				{genres.map((section) => (
					<section className='mx-auto mt-4 h-[400px] w-full md:h-auto'>
						<h2 className='mx-auto w-[calc(100%-3%)] cursor-pointer p-4 text-left text-xl font-extrabold text-amber-500 sm:w-[calc(100%-8%)]'>
							{section.heading}
						</h2>
						<div
							id='latest'
							className='mx-auto flex h-[350px] w-[calc(100%-10%)] animate-pulse overflow-x-scroll pt-2 md:h-auto md:w-[calc(100%-13%)] md:pb-4 lg:w-[calc(100%-11.5%)] xl:w-[calc(100%-10.5%)] 2xl:w-[calc(100%-10%)]'>
							{arr?.map(() => (
								<div className='mx-auto mr-6 flex h-80 w-40 flex-shrink-0 flex-col items-start justify-start overflow-hidden md:mr-10 md:h-auto md:w-44'>
									<p className='mb-2 h-56 w-40 rounded-lg bg-neutral-700 transition-all delay-[2] ease-in md:h-64 md:w-44'></p>
									<h3
										className='whitespace-pre-line
					 text-left font-bold text-teal-500'></h3>
									<div className='mb-1 flex text-sm font-bold'>
										<h4 className='mr-2 text-white'></h4>
										<h4 className={` mt-[1px]`}></h4>
									</div>
									<h3 className='whitespace-nowrap text-xs font-semibold text-gray-700'></h3>
								</div>
							))}
						</div>
					</section>
				))}
			</div>
		</>
	);
}
