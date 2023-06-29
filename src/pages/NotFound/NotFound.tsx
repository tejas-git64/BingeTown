import { Link } from "react-router-dom";
import { auth } from "../../config/Firebase";

export default function NotFound() {
	return (
		<>
			<div className='flex h-[calc(100dvh-0dvh)] w-full flex-col items-center justify-center bg-neutral-800 bg-[url("https://i.pinimg.com/originals/c5/dc/40/c5dc403178d1afa38b1ea167333b8c2d.jpg")] bg-cover bg-center bg-no-repeat'>
				<h1 className='mb-16 text-9xl font-extrabold text-neutral-800'>404</h1>
				<h2 className='text-3xl font-extrabold text-neutral-600'>
					Page not found
				</h2>
				<h3 className='mb-10 mt-5 text-base font-bold text-neutral-400'>
					Oops! you've opened a non existing page 😬
				</h3>
				<Link
					to={auth.currentUser ? `/home` : `/`}
					className='rounded-full bg-teal-500 p-3 px-6 font-extrabold text-gray-700 shadow-2xl transition-all delay-[3] ease-in-out hover:scale-110 hover:text-black hover:shadow-teal-400'>
					Go back!
				</Link>
			</div>
		</>
	);
}
