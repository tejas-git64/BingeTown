import { DocumentData } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
// import { Credentials } from "./Auth";

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

export type LayoutContextTypes = {
  svg: number;
  sideNav: boolean;
  setSideNav: Dispatch<SetStateAction<boolean>>;
};
