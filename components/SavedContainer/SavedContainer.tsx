"use client";

import { auth, db } from "@/firebase/Firebase";
import { SavedTypes, SavedTitleType } from "@/types/LayoutTypes";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import SavedTitle from "../SavedTitle/SavedTitle";
import { v4 as uuidv4 } from "uuid";
import MovieShowFallback from "@/app/movies/loading";

export default function SavedContainer() {
  const [saved, setSaved] = useState<SavedTypes | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function fetchSavedList() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const savedRef = doc(db, "saved", uid);
        (async function getSavedData() {
          //Saved data
          const savedDoc = await getDoc(savedRef);
          if (savedDoc) {
            setSaved(() => ({
              uid: uid,
              savedtitles: savedDoc.data() as DocumentData,
              docRef: savedRef,
            }));
          }
          setIsLoading(false);
        })();
      }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchSavedList();
  }, []);

  return (
    <>
      {isLoading ? (
        <MovieShowFallback />
      ) : (
        <>
          {saved && saved.savedtitles.savedtitles.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
                gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
              className="protected-container-parent"
            >
              {saved.savedtitles.savedtitles?.map((title: SavedTitleType) => (
                <div key={uuidv4()} className="mx-auto w-min">
                  <SavedTitle
                    {...title}
                    docRef={saved.docRef}
                    refetch={fetchSavedList}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="-mt-14 flex h-full w-full flex-col items-center justify-center">
              <p className="mb-10 whitespace-nowrap text-center text-5xl text-neutral-200">
                щ(゜ロ゜щ)
              </p>
              <p className="whitespace-nowrap text-center text-xl text-neutral-200">
                No titles saved yet
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}
