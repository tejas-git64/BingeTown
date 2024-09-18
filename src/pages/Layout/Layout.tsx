import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { createContext, useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import Profile from "../Profile/Profile";
import Sidenav from "../../components/Sidenav/Sidenav";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { LayoutTypes, SavedTypes, WatchListType } from "./LayoutTypes";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

export const NameContext = createContext<LayoutTypes | null>(null);
export const SVGContext = createContext<number>(0);
export default function Layout() {
	const [name, setName] = useState("");
	const [profilePage, setProfilePage] = useState(false);
	const [sideNav, setSideNav] = useState(false);
	const [saved, setSaved] = useState<SavedTypes | null>(null);
	const [watchList, setWatchList] = useState<WatchListType | null>(null);
	const path = useLocation().pathname;
	const [svg, setSvg] = useState<number>(0);

	const getSavedTitles = () => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const savedRef = doc(db, "saved", uid);

				(async function getSavedData() {
					//Saved data
					const savedDoc = await getDoc(savedRef);
					const savedData = savedDoc.data();
					if (savedData) {
						setSaved(savedData);
					}
				})();
			}
		});
		return () => unsubscribe();
	};

	const getWatchlistData = () => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const savedRef = doc(db, "watchlist", uid);
				(async function getWatchData() {
					//Saved data
					const watchDoc = await getDoc(savedRef);
					const watchData = watchDoc.data();
					if (watchData) {
						setWatchList(watchData);
					}
				})();
			}
		});
		return () => unsubscribe();
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [path]);

	useEffect(() => {
		const number = Math.floor(Math.random() * 2000) + 1;
		setSvg(number);
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const savedRef = doc(db, "saved", uid);
				const watchlistRef = doc(db, "watchlist", uid);
				(async function getListData() {
					//Saved data
					const savedDoc = await getDoc(savedRef);
					const savedData = savedDoc.data();
					if (savedData) {
						setSaved(savedData);
					}
					//Watchlist data
					const watchlistDoc = await getDoc(watchlistRef);
					const watchlistData = watchlistDoc.data();
					if (watchlistData) {
						setWatchList(watchlistData);
					}
				})();
			}
		});
		return () => unsubscribe();
	}, []);

	return (
		<>
			<motion.div className='flex h-auto w-full flex-col items-center justify-end overflow-x-hidden bg-black'>
				<div className='max-h-auto min-h-[100vh] w-full bg-neutral-900'>
					<NameContext.Provider
						value={{
							name: [name, setName],
							profilePage: [profilePage, setProfilePage],
							sideNav: [sideNav, setSideNav],
							saved: [saved, setSaved],
							watchlist: [watchList, setWatchList],
							getSavedTitles,
							getWatchlistData,
						}}>
						{path !== "/search" && <Nav />}
						<SVGContext.Provider value={svg}>
							<Sidenav />
							<Profile />
						</SVGContext.Provider>
						<Outlet />
					</NameContext.Provider>
				</div>
				<Footer />
			</motion.div>
		</>
	);
}
