import {
  collection,
  query,
  where,
  getCountFromServer,
  DocumentReference,
  DocumentData,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./Firebase";
import { SavedTitleType, WatchListTitle } from "@/types/LayoutTypes";

export const getDocCount = async (uuid: string, docName: string) => {
  const watchlistRef = collection(db, docName);
  const q = query(watchlistRef, where("uid", "==", uuid));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export async function addToSavedList(
  titleId: number,
  title: string,
  poster_path: string,
  vote_average: number,
  release_date: string,
  type: string,
  savedDocRef: DocumentReference<DocumentData, DocumentData>,
) {
  await updateDoc(savedDocRef, {
    savedtitles: arrayUnion({
      id: titleId,
      type: type,
      title: title,
      poster_path: poster_path,
      vote_average: vote_average,
      release_date: release_date,
    }),
  });
}

export async function addToWatchList(
  titleId: number,
  type: string,
  title: string,
  poster_path: string,
  vote_average: number,
  release_date: string,
  watchDocRef: DocumentReference<DocumentData, DocumentData>,
) {
  await updateDoc(watchDocRef, {
    watchlist: arrayUnion({
      id: titleId,
      type: type,
      watched: false,
      title: title,
      poster_path: poster_path,
      vote_average: vote_average,
      release_date: release_date,
    }),
  });
}

export async function removeTitle({
  title,
  id,
  poster_path,
  release_date,
  type,
  vote_average,
  watched,
  docRef,
}: WatchListTitle) {
  await updateDoc(docRef, {
    watchlist: arrayRemove({
      id: id,
      poster_path: poster_path,
      release_date: release_date,
      title: title,
      type: type,
      vote_average: vote_average,
      watched: watched,
    }),
  });
}

export async function unSaveTitle({
  title,
  id,
  poster_path,
  release_date,
  type,
  vote_average,
  docRef,
}: SavedTitleType) {
  await updateDoc(docRef, {
    savedtitles: arrayRemove({
      id: id,
      poster_path: poster_path,
      release_date: release_date,
      title: title,
      type: type,
      vote_average: vote_average,
    }),
  });
}
