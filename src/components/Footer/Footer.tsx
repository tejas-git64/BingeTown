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
			<h2 className='pb-10 text-xl md:text-2xl'>Reach us here</h2>
			<div className='flex h-auto w-auto items-start justify-around'>
				<div className='flex h-auto w-28 flex-col items-start justify-start space-y-1 p-4 leading-loose md:w-auto md:items-center'>
					<h3 className='text-md md:text-md mb-6 font-semibold text-[#678c98]'>
						More
					</h3>
					<a
						href='#'
						className='md:text-md text-sm text-gray-400 hover:text-teal-400'>
						Movies
					</a>
					<a
						href='#'
						className='md:text-md text-sm text-gray-400 hover:text-teal-400'>
						Popular
					</a>
					<a
						href='#'
						className='md:text-md text-sm text-gray-400 hover:text-teal-400'>
						TV Shows
					</a>
					<a
						href='#'
						className='md:text-md text-sm text-gray-400 hover:text-teal-400'>
						Originals
					</a>
				</div>
				<div className='flex h-auto w-28 flex-col items-start justify-start space-y-1 p-4 leading-loose md:w-auto md:items-center'>
					<h3 className='text-md md:text-md mb-6 font-semibold text-[#678c98]'>
						Help
					</h3>
					<a
						href='#'
						className='md:text-md text-left text-sm text-gray-400 hover:text-teal-400'>
						Account Support
					</a>
					<a
						href='#'
						className='md:text-md text-left text-sm text-gray-400 hover:text-teal-400'>
						Supported Devices
					</a>
					<a
						href='#'
						className='md:text-md text-sm text-gray-400 hover:text-teal-400'>
						Accessibility
					</a>
					<a
						href='#'
						className='md:text-md text-sm text-gray-400 hover:text-teal-400'>
						Contact us
					</a>
				</div>
			</div>
			<div className='mx-auto flex h-auto w-full flex-col items-center justify-center py-6 md:w-96 md:flex-row'>
				<h4 className='text-md mx-6 my-4 font-semibold text-[#88979f] md:my-0 md:mr-12 md:whitespace-nowrap'>
					Look me up here
				</h4>
				<div className='mx-auto flex w-[65%] items-center justify-evenly'>
					<a href='https://twitter.com/yousurebro_tej'>
						<img
							src={twit}
							alt='twitter'
							width={10}
							height={10}
							className='h-10 w-10 p-2'
						/>
					</a>
					<a href='https://www.linkedin.com/in/tejas-dl-94b771185'>
						<img
							src={linkedin}
							alt='linkedin'
							width={10}
							height={10}
							className='mx-4 mr-6 h-10 w-10 p-2'
						/>
					</a>
					<a href='https://github.com/tejas-git64'>
						<img
							src={github}
							alt='github'
							width={10}
							height={10}
							className='h-7 w-7'
						/>
					</a>
				</div>
			</div>
			<h4 className='text-sm font-semibold text-neutral-400'>
				©️BingTown {new Date().getFullYear()}
			</h4>
			<h4 className='ml-2 mt-6 text-sm font-medium text-white'>
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
