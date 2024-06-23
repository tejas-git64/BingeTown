import twit from "../../assets/svgs/icons8-twitterx.svg";
import linkedin from "../../assets/svgs/icons8-linkedin.svg";
import github from "../../assets/svgs/icons8-github.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
	const [foot, setFoot] = useState(false);
	const path = useLocation().pathname;
	useEffect(() => {
		if (path !== "/login" && path !== "/signup") {
			setFoot(true);
		} else {
			setFoot(false);
		}
	}, [path]);

	return (
		<footer
			className={`${
				foot ? "flex" : "hidden"
			} h-auto w-full flex-col bg-black p-4 py-10`}>
			<h2 className='pb-10 text-2xl'>Reach us here</h2>
			<div className='flex h-auto w-auto justify-around'>
				<ul className='flex h-auto w-28 flex-col items-center justify-start p-4 leading-loose md:w-60 md:items-start'>
					<h3 className='text-md mb-6 font-semibold text-gray-700 md:text-lg'>
						More
					</h3>
					<a
						href='#'
						className='text-sm text-gray-500 hover:text-teal-400 md:text-lg'>
						Movies
					</a>
					<a
						href='#'
						className='text-sm text-gray-500 hover:text-teal-400 md:text-lg'>
						Popular
					</a>
					<a
						href='#'
						className='text-sm text-gray-500 hover:text-teal-400 md:text-lg'>
						TV Shows
					</a>
					<a
						href='#'
						className='text-sm text-gray-500 hover:text-teal-400 md:text-lg'>
						Originals
					</a>
				</ul>
				<ul className='flex h-auto w-28 flex-col items-center justify-start p-4 leading-loose md:w-60 md:items-start'>
					<h3 className='text-md mb-6 font-semibold text-gray-700 md:text-lg'>
						Help
					</h3>
					<a
						href='#'
						className='text-sm text-gray-500 hover:text-teal-400 md:text-lg'>
						Account Support
					</a>
					<a
						href='#'
						className='text-sm text-gray-500 hover:text-teal-400 md:text-lg'>
						Supported Devices
					</a>
					<a
						href='#'
						className='text-sm text-gray-500 hover:text-teal-400 md:text-lg'>
						Accessibility
					</a>
					<a
						href='#'
						className='text-sm text-gray-500 hover:text-teal-400 md:text-lg'>
						Contact us
					</a>
				</ul>
			</div>
			<div className='mx-auto flex h-auto w-full flex-col items-center justify-center py-6 md:w-96 md:flex-row'>
				<h4 className='text-md mx-6 my-4 font-semibold text-neutral-700 md:my-0 md:mr-12 md:whitespace-nowrap md:text-lg'>
					Look me up here
				</h4>
				<div className='mx-auto flex w-[65%] items-center justify-evenly'>
					<a href='https://twitter.com/yousurebro_tej'>
						<img
							src={twit}
							alt='twitter'
							className='h-10 w-10 p-2 hover:invert-[2] md:h-12 md:w-12'
						/>
					</a>
					<a href='https://www.linkedin.com/in/tejas-dl-94b771185'>
						<img
							src={linkedin}
							alt='linkedin'
							className='mx-4 mr-6 h-10 w-10 p-2 hover:invert-[2] md:h-12 md:w-12'
						/>
					</a>
					<a href='https://github.com/tejas-git64'>
						<img
							src={github}
							alt='github'
							className='h-7 w-7 hover:invert-[2] md:h-9 md:w-9'
						/>
					</a>
				</div>
			</div>
			<h4 className='font-extrabold text-gray-600'>
				©️BingTown {new Date().getFullYear()}
			</h4>
			<h4 className='ml-2 mt-6 text-sm font-extrabold text-white'>
				Made by{" "}
				<a
					href='https://github.com/tejas-git64'
					className='px-1 font-semibold text-fuchsia-400'>
					Tej
				</a>
			</h4>
		</footer>
	);
}
