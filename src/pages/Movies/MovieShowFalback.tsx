export default function MovieShowFallback() {
	const items = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
					gridTemplateRows: "repeat(auto-fill, minmax(200px, 1fr))",
				}}
				className='mb-16 mt-4 h-full w-full gap-x-8 gap-y-5 sm:gap-y-8 sm:pl-0'>
				{items.map(() => (
					<div
						key={Math.random()}
						className='mx-auto mr-2 flex h-60 w-40 flex-shrink-0 animate-pulse flex-col items-start justify-start overflow-hidden rounded-lg hover:drop-shadow-2xl md:mr-10 md:h-auto md:w-44'>
						<p className='mb-2 h-56 w-40 rounded-lg bg-neutral-600 transition-all delay-[1] ease-in hover:mb-4 md:h-64 md:w-44' />
						<h3
							className='w-full
					 whitespace-pre-line bg-neutral-700 text-left font-bold text-teal-500'></h3>
						<div className='mb-1 flex w-[calc(100%-50%)] bg-neutral-700 text-sm font-bold'></div>
						<h3 className='w-[calc(100%-70%)] whitespace-nowrap bg-neutral-700 text-xs font-semibold text-gray-700'></h3>
					</div>
				))}
			</div>
		</>
	);
}
