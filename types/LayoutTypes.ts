import { DocumentData, DocumentReference } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

//Saved types
export type SavedTitleType = {
  id: number;
  type: string;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  docRef: DocumentReference<DocumentData>;
};

//Watched Types
export type WatchListTitle = {
  watched: boolean;
} & SavedTitleType;

export type WatchListType = {
  uid: string;
  watchlist: DocumentData;
  docRef: DocumentReference<DocumentData, DocumentData>;
};

export type SavedTypes = {
  uid: string;
  savedtitles: DocumentData;
  docRef: DocumentReference<DocumentData, DocumentData>;
};

export type LayoutContextTypes = {
  svg: number;
  sideNav: boolean;
  setSideNav: Dispatch<SetStateAction<boolean>>;
};
