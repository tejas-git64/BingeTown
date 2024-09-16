export default function Loading() {
	const arr = [{}, {}, {}, {}, {}, {}, {}, {}];

	return (
		<div
			id='section-loading'
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
	);
}
