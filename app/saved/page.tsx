"use client";
import { Suspense, useEffect, useState } from "react";
import { SavedTitleType, SavedTypes } from "@/types/LayoutTypes";
import MovieShowFallback from "../movies/loading";
import { onAuthStateChanged } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/Firebase";
import SavedTitle from "@/components/SavedTitle/SavedTitle";
import { v4 as uuidv4 } from "uuid";

export default function Saved() {
  const [saved, setSaved] = useState<SavedTypes | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        })();
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="protected-container">
        <p className="protected-container-heading">Saved</p>
        <Suspense fallback={<MovieShowFallback />}>
          <div className="protected-container-parent">
            {saved ? (
              saved.savedtitles.savedtitles?.map((title: SavedTitleType) => (
                <div key={uuidv4()} className="mx-auto w-min">
                  <SavedTitle {...title} docRef={saved.docRef} />
                </div>
              ))
            ) : (
              <div>You have no saved titles</div>
            )}
          </div>
        </Suspense>
      </div>
    </>
  );
}
