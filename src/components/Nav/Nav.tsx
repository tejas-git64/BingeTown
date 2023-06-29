import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../config/Firebase";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { NameContext } from "../../pages/Layout/Layout";
import search from "../../assets/svgs/icons8-search.svg";
import menu from "../../assets/images/icons8-menu-50.png";
import { MultiSearch } from "./Search";
import { motion } from "framer-motion";

export default function Nav() {
	const path = useLocation().pathname;
	const [loggedIn, setLoggedIn] = useState(false);
	const [searchResults, setSearchResults] = useState<MultiSearch | null>(null);
	const [query, setQuery] = useState("");
	const NavContext = useContext(NameContext);
	const navigate = useNavigate();

	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: import.meta.env.VITE_TMDB_READ_ACCESS_KEY,
		},
	};

	const navvar = {
		initial: {
			opacity: 0,
			translateY: -20,
		},
		animate: {
			opacity: 1,
			translateY: 0,
		},
		exit: {
			opacity: 0,
			translateY: -20,
		},
		transition: {
			type: "spring",
			duration: 3,
			ease: "easeIn",
		},
	};

	function showTitle(mediaType: string, id: number) {
		mediaType === "tv" ? navigate(`/tvshows/${id}`) : navigate(`/movies/${id}`);
		setSearchResults(null);
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			user ? setLoggedIn(true) : setLoggedIn(false);
		});
	}, []);

	async function getSearchResults() {
		const res = await fetch(
			`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
			options
		);
		const data = await res.json();
		const results = data.results;
		const min: MultiSearch = results.filter(
			(res: { media_type: string }) => res.media_type !== "person"
		);
		setSearchResults(min.slice(0, 5));
	}

	useEffect(() => {
		getSearchResults();
	}, [query]);

	return (
		<motion.nav
			variants={navvar}
			initial='initial'
			animate='animate'
			exit='exit'
			transition={{
				delay: 0.5,
				duration: 1,
			}}
			className={`${
				path === "/login" || path === "/signup" ? "hidden" : "absolute"
			} left-0 top-0 z-10 flex h-20 w-full items-center justify-between bg-gradient-to-b from-black to-transparent px-6 transition-all delay-[3] ease-out md:px-20`}>
			<Link
				to='/'
				className='-mt-2 mr-10 text-2xl font-bold text-white md:mt-0'>
				BingeTown
			</Link>
			<div className='flex w-full items-center justify-end'>
				<button
					onClick={() => NavContext?.searchPage[1](true)}
					className='-mt-0.5 mr-4 border-none bg-transparent p-0 outline-none md:mr-5 md:mt-1 lg:hidden'>
					<img src={search} alt='search' className='h-8 w-8' />
				</button>
				<div className='-ml-28 hidden w-[calc(100%-20%)] items-center md:justify-end lg:-ml-0 lg:flex'>
					<div
						className={`${
							path !== "/" ? "block" : "hidden"
						} relative mr-10 mt-1 h-auto w-full`}>
						<input
							type='search'
							name='movie-search'
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder='Search for your favorite movies, tv shows and more'
							className='my-1 h-10 w-full rounded-full border-none bg-neutral-800 px-4 text-sm font-bold text-white outline-none placeholder:font-medium placeholder:text-neutral-500 lg:-ml-0'
						/>
						<ul className='absolute flex h-auto w-full flex-col items-end justify-start'>
							{searchResults?.map((result) => (
								<div
									key={result.id}
									onClick={() => showTitle(result.media_type, result.id)}
									className='mb-0.5 flex h-14 w-full items-center justify-between rounded-md bg-neutral-800 p-2 pr-6 hover:cursor-pointer hover:bg-gray-800'>
									<div className='flex w-auto items-center justify-start overflow-x-hidden whitespace-nowrap'>
										<img
											src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
											alt='search-img'
											className='mr-4 hidden h-10 w-20 rounded-lg text-xs 2xl:block'
										/>
										<div className='flex h-auto w-auto flex-col items-start justify-center'>
											<h3 className='text-left text-sm font-bold text-white'>
												{result.title}
											</h3>
											<div className='flex w-auto items-center justify-start'>
												<h4 className='mr-4 text-xs font-semibold text-gray-400'>
													Rating: {result.vote_average} ⭐
												</h4>
												<h4 className='text-xs font-semibold text-gray-400'>
													{result.release_date}
												</h4>
											</div>
										</div>
									</div>
									<p
										className={`${
											result.media_type === "tv"
												? "text-fuchsia-500"
												: "text-yellow-400"
										} py-2 pl-4 text-base uppercase`}>
										{result.media_type}
									</p>
								</div>
							))}
						</ul>
					</div>
					<Link
						to='/home'
						className='delay-3 mr-10 py-5 text-lg font-bold text-white transition-all ease-out hover:text-teal-400 hover:shadow-[0px_2px_0px_#2dd4bf]'>
						Home
					</Link>
					<Link
						to='/movies'
						className='delay-3 mr-10 py-5 text-lg font-bold text-white transition-all ease-out hover:text-teal-400 hover:shadow-[0px_2px_0px_#2dd4bf]'>
						Movies
					</Link>
					<Link
						to='/tvshows'
						className='delay-3 mr-12 whitespace-nowrap py-5 text-lg font-bold text-white transition-all ease-out hover:text-teal-400 hover:shadow-[0px_2px_0px_#2dd4bf]'>
						TV Shows
					</Link>
				</div>
				<Link
					to='/signup'
					className={`${
						loggedIn ? "hidden" : "block"
					} delay-3 -mt-1 mr-0 whitespace-nowrap rounded-full bg-teal-500 p-6 py-2 text-sm font-bold text-black transition-all ease-out hover:bg-teal-400 hover:text-black md:mr-6 md:mt-1`}>
					Sign up
				</Link>
				<Link
					to='/login'
					className={`${
						loggedIn ? "hidden" : "hidden md:block"
					} delay-3 -mt-1 whitespace-nowrap rounded-full border-[1px] border-teal-400 p-6 py-2 text-sm font-bold text-teal-400 transition-all ease-out hover:mx-2 hover:scale-110 hover:border-none hover:bg-fuchsia-500 hover:text-black md:mt-1.5`}>
					Login
				</Link>
				<button
					onClick={() => NavContext?.sideNav[1]((prev) => !prev)}
					style={{
						border: "none",
						outline: "none",
					}}
					className={`${
						auth.currentUser ? "block" : "hidden"
					} -mt-0.5 h-7 w-7 bg-transparent p-0 md:mt-1`}>
					<img src={menu} alt='' />
				</button>
			</div>
		</motion.nav>
	);
}
