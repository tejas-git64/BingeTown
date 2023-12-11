export default function Loading() {
	const arr = [{}, {}, {}, {}, {}, {}, {}, {}];

	return (
		<div
			id='section-loading'
			className='mx-auto flex h-[300px] w-full overflow-hidden pl-3 pt-2 sm:mt-0 sm:w-[calc(100%-10%)] sm:pl-4 md:my-4 md:h-[335px] md:pl-2.5 lg:pl-0'>
			{arr.map(() => (
				<div
					key={Math.random()}
					className='my-1 mr-6 flex h-auto w-36 flex-shrink-0 animate-pulse flex-col items-start justify-start transition-all animation-delay-100 hover:drop-shadow-2xl md:mr-10 md:h-[300px] md:w-[154px]'>
					<div className='mx-auto mb-2 h-[231px] w-[154px] rounded-lg bg-neutral-600 transition-all delay-0 ease-in'></div>
					<h3 className='h-[14px] w-full rounded-lg bg-neutral-600 md:mt-3'></h3>
					<div className='flex w-full items-center justify-between'>
						<div className='flex h-[41px] w-full flex-col items-start justify-center'>
							<div className='my-2 h-[12px] w-20 rounded-lg bg-neutral-600'></div>
							<h3 className='h-3 w-12 rounded-lg bg-neutral-600'></h3>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
