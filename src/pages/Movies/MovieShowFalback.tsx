export default function MovieShowFallback() {
	const items = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

	return (
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
					gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
				}}
				className='mb-6 mt-4 h-auto animate-pulse gap-x-4 gap-y-4 md:gap-x-6'>
				{items.map(() => (
					<div
						key={Math.random()}
						className='relative mx-auto mr-4 flex h-[300px] w-[154px] flex-shrink-0 flex-col items-start justify-start overflow-hidden md:mr-6'>
						<div className='mx-auto mb-2 h-[231px] w-[154px] cursor-pointer rounded-lg bg-neutral-500 transition-all delay-0 ease-in'></div>
						<div
							className='h-3
					 w-full whitespace-pre-line rounded-full bg-neutral-600'></div>
						<div
							className='my-1
					 h-[10.5px] w-20 whitespace-pre-line rounded-full bg-neutral-600'></div>
						<h3
							className='
					 h-[10.5px] w-12 whitespace-pre-line rounded-full bg-neutral-600'></h3>
					</div>
				))}
			</div>
		</>
	);
}
