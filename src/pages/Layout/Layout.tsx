import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { createContext, useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import SearchPage from "../SearchPage/SearchPage";
import Profile from "../Profile/Profile";
import Sidenav from "../../components/Sidenav/Sidenav";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { LayoutTypes, SavedTypes, WatchListType } from "./LayoutTypes";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

export const NameContext = createContext<LayoutTypes | null>(null);
export default function Layout() {
	const [name, setName] = useState("");
	const [searchPage, setSearchPage] = useState(false);
	const [profilePage, setProfilePage] = useState(false);
	const [sideNav, setSideNav] = useState(false);
	const [saved, setSaved] = useState<SavedTypes | null>(null);
	const [watchList, setWatchList] = useState<WatchListType | null>(null);

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
				<NameContext.Provider
					value={{
						name: [name, setName],
						searchPage: [searchPage, setSearchPage],
						profilePage: [profilePage, setProfilePage],
						sideNav: [sideNav, setSideNav],
						saved: [saved, setSaved],
						watchlist: [watchList, setWatchList],
					}}>
					<Nav />
					<SearchPage />
					<Sidenav />
					<Profile />
					<Outlet />
				</NameContext.Provider>
				<Footer />
			</motion.div>
		</>
	);
}
