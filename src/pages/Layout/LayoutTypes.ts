/* eslint-disable no-mixed-spaces-and-tabs */
import { DocumentData } from "firebase/firestore";

//Watched Types
export type WatchListTitle = {
	id: number;
	type: string;
	watched: boolean;
	title: string;
	poster_path: string;
	vote_average: number;
	release_date: string;
};

export type WatchListType =
	| {
			uid: string;
			watchlist: DocumentData;
	  }
	| DocumentData;

//Saved types
export type SavedTitleType = {
	id: number;
	type: string;
	title: string;
	poster_path: string;
	vote_average: number;
	release_date: string;
};

export type SavedTypes =
	| {
			uid: string;
			savedtitles: DocumentData;
	  }
	| DocumentData;

export type LayoutTypes = {
	name: [name: string, setName: React.Dispatch<React.SetStateAction<string>>];
	searchPage: [
		searchPage: boolean,
		setSearchPage: React.Dispatch<React.SetStateAction<boolean>>
	];
	profilePage: [
		profilePage: boolean,
		setProfilePage: React.Dispatch<React.SetStateAction<boolean>>
	];
	sideNav: [
		Sidenav: boolean,
		setSideNav: React.Dispatch<React.SetStateAction<boolean>>
	];
	saved: [
		saved: SavedTypes | null,
		setSaved: React.Dispatch<React.SetStateAction<SavedTypes | null>>
	];
	watchlist: [
		watchList: WatchListType | null,
		setWatchList: React.Dispatch<React.SetStateAction<WatchListType | null>>
	];
};
