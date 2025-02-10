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
      <div className="max-h-auto -mt-4 h-[100dvh] w-full bg-neutral-900 px-5 pb-2 text-left md:px-6">
        <p className="my-4 py-2 text-base font-bold text-white md:text-lg">
          Saved
        </p>
        <Suspense fallback={<MovieShowFallback />}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
              gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
            className="h-auto gap-x-4 gap-y-4 md:gap-x-6"
          >
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
