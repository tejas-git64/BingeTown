import { useContext } from "react";
import { NameContext, SVGContext } from "../../pages/Layout/Layout";
import profile from "../../assets/images/icons8-user-24.png";
import bookmarked from "../../assets/images/bookmarked.png";
import watchlist from "../../assets/images/icons8-list-50.png";
import close from "../../assets/images/icons8-close-48.png";
import tvshow from "../../assets/images/icons8-tv-50.png";
import movie from "../../assets/images/icons8-movie-24.png";
import home from "../../assets/images/icons8-home-24.png";
import { auth } from "../../config/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Sidenav() {
	const sideContext = useContext(NameContext);
	const { svg }: any = useContext(SVGContext);
	const navigate = useNavigate();
	function showProfile() {
		sideContext?.profilePage[1](true);
		sideContext?.sideNav[1](false);
	}

	function navigateToPage(page: string) {
		navigate(`/${page}`);
		sideContext?.sideNav[1](false);
	}

	const SignOut = async () => {
		sideContext?.sideNav[1](false);
		try {
			await signOut(auth);
			onAuthStateChanged(auth, (user) => {
				if (user === null) {
					navigate("/");
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<>
			<div
				className={`fixed top-0 z-20 h-full w-full animate-none overflow-y-scroll border-l-[1px] border-neutral-800 bg-neutral-900 transition-all ease-in-out sm:w-96 md:h-[1000px] ${
					sideContext?.sideNav[0] ? "right-0" : "-right-full sm:-right-96"
				}`}>
				<div className='flex w-full justify-end px-6 py-7'>
					<button
						onClick={() => sideContext?.sideNav[1](false)}
						className='border-none bg-transparent p-0 outline-none'>
						<img src={close} alt='close-button' className='h-[30px] w-[30px]' />
					</button>
				</div>
				<div className='mt-6 flex h-36 w-full flex-col items-center justify-evenly p-1'>
					<img
						src={
							auth.currentUser?.photoURL ||
							`https://api.dicebear.com/7.x/notionists/svg?seed=${svg}&size=32&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear,solid&glassesProbability=50`
						}
						alt='user-img'
						className='h-20 w-20 rounded-full border-none bg-gray-200 text-[10px]'
					/>
					<p className='text-[15px] text-white'>
						{auth.currentUser?.displayName || sideContext?.name[0]}
					</p>
				</div>
				<div className='mx-auto mt-10 flex h-auto w-[calc(100%-20%)]  flex-col items-center justify-center rounded-3xl bg-black py-0'>
					<div
						onClick={showProfile}
						className='flex w-full items-center justify-between rounded-t-3xl border-b-[1px] border-neutral-700 px-10 py-5 hover:bg-neutral-700'>
						<img src={profile} alt='profile' className='mr-1 h-6 w-6' />
						<p className='text-base text-white'>Profile</p>
					</div>
					<div
						onClick={() => navigateToPage("home")}
						className='flex w-full items-center justify-between border-b-[1px] border-neutral-700 px-10 py-5 hover:bg-neutral-700'>
						<img src={home} alt='profile' className='-ml-0.5 mr-1 h-7 w-7' />
						<p className='text-base text-white'>Home</p>
					</div>
					<div
						onClick={() => navigateToPage("movies")}
						className='flex w-full items-center justify-between border-b-[1px] border-neutral-700 px-10 py-5 hover:bg-neutral-700'>
						<img src={movie} alt='profile' className='-ml-0.5 mr-1 h-7 w-7' />
						<p className='text-base text-white'>Movies</p>
					</div>
					<div
						onClick={() => navigateToPage("tvshows")}
						className='flex w-full items-center justify-between border-b-[1px] border-neutral-700 px-10 py-5 hover:bg-neutral-700'>
						<img src={tvshow} alt='profile' className='-ml-1 h-8 w-8' />
						<p className='text-base text-white'>TV Shows</p>
					</div>
					<div
						onClick={() => navigateToPage("saved")}
						className='flex w-full items-center justify-between border-b-[1px] border-neutral-700 px-10 py-5 hover:bg-neutral-700'>
						<img src={bookmarked} alt='saved' className='mr-1 h-6 w-6' />
						<p className='text-base text-white'>Saved</p>
					</div>
					<div
						onClick={() => navigateToPage("watchlist")}
						className='flex w-full items-center justify-between rounded-b-3xl px-10 py-5 hover:bg-neutral-700'>
						<img src={watchlist} alt='watchlist' className='mr-1.5 h-6 w-6' />
						<p className='text-base text-white'>Watchlist</p>
					</div>
				</div>
				<button
					onClick={SignOut}
					className='mb-6  mt-[calc(100vh-80vh)] rounded-full border-none bg-teal-500 px-10 py-2 font-bold text-black outline-none'>
					Sign out
				</button>
			</div>
		</>
	);
}
