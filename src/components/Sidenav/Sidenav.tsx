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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
				className={`fixed top-0 z-20 h-full w-80 animate-none border-l-[1px] border-neutral-800 bg-neutral-900 transition-all ease-in-out ${
					sideContext?.sideNav[0] ? "right-0" : "-right-full sm:-right-96"
				}`}>
				<div className='flex w-full justify-end px-6 py-7'>
					<button
						onClick={() => sideContext?.sideNav[1](false)}
						style={{
							border: "none",
							outline: "none",
						}}
						className='bg-transparent p-0'>
						<img src={close} alt='close-button' className='h-[30px] w-[30px]' />
					</button>
				</div>
				<div className='flex h-36 w-full flex-col items-center justify-evenly p-1'>
					<img
						src={
							auth.currentUser?.photoURL ||
							`https://api.dicebear.com/7.x/notionists/svg?seed=${svg}&size=32&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear,solid&glassesProbability=50`
						}
						alt='user-img'
						className='h-20 w-20 rounded-full border-none bg-gray-200 text-[10px]'
					/>
				</div>
				<div className='mx-auto flex h-auto w-[250px] flex-col items-center justify-center rounded-3xl bg-black py-0'>
					<div
						onClick={showProfile}
						className='flex w-full cursor-pointer items-center justify-between rounded-t-3xl border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700'>
						<img src={profile} alt='profile' className='mr-1 h-5 w-5' />
						<p className='text-sm text-white'>Profile</p>
					</div>
					<div
						onClick={() => navigateToPage("home")}
						className='flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700'>
						<img src={home} alt='profile' className='-ml-0.5 mr-1 h-6 w-6' />
						<p className='text-sm text-white'>Home</p>
					</div>
					<div
						onClick={() => navigateToPage("movies")}
						className='flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700'>
						<img src={movie} alt='profile' className='-ml-0.5 mr-1 h-6 w-6' />
						<p className='text-sm text-white'>Movies</p>
					</div>
					<div
						onClick={() => navigateToPage("tvshows")}
						className='flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700'>
						<img src={tvshow} alt='profile' className='-ml-1 h-7 w-7' />
						<p className='text-sm text-white'>TV Shows</p>
					</div>
					<div
						onClick={() => navigateToPage("saved")}
						className='flex w-full cursor-pointer items-center justify-between border-b-[1px] border-neutral-700 px-6 py-3 transition-colors duration-75 hover:bg-neutral-700'>
						<img src={bookmarked} alt='saved' className='mr-1 h-5 w-5' />
						<p className='text-sm text-white'>Saved</p>
					</div>
					<div
						onClick={() => navigateToPage("watchlist")}
						className='flex w-full cursor-pointer items-center justify-between rounded-b-3xl px-6 py-3 transition-colors duration-75 hover:bg-neutral-700'>
						<img src={watchlist} alt='watchlist' className='mr-1.5 h-5 w-5' />
						<p className='text-sm text-white'>Watchlist</p>
					</div>
				</div>
				<button
					onClick={SignOut}
					className='mt-20 rounded-full border-none bg-teal-500 px-6 py-2 text-[12px] font-extrabold text-black outline-none transition-colors hover:bg-teal-600 md:mt-40'>
					Sign out
				</button>
			</div>
		</>
	);
}
