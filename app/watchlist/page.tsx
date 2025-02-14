"use client";
import { Suspense, useEffect, useState } from "react";
import { WatchListTitle, WatchListType } from "@/types/LayoutTypes";
import MovieShowFallback from "../movies/loading";
import { onAuthStateChanged } from "firebase/auth";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/Firebase";
import WatchTitle from "@/components/WatchTitle/WatchTitle";
import { v4 as uuidv4 } from "uuid";

export default function WatchList() {
  const [data, setData] = useState<WatchListType | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const watchRef = doc(db, "watchlist", uid);
        (async () => {
          //Watchlist data
          const watchDoc = await getDoc(watchRef);
          if (watchDoc) {
            setData(() => ({
              uid: uid,
              watchlist: watchDoc.data() as DocumentData,
              docRef: watchRef,
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
        <p className="protected-container-heading">WatchList</p>
        <Suspense fallback={<MovieShowFallback />}>
          <div className="protected-container-parent">
            {data ? (
              data.watchlist.watchlist?.map((title: WatchListTitle) => (
                <div key={uuidv4()} className="mx-auto w-min">
                  <WatchTitle {...title} docRef={data.docRef} />
                </div>
              ))
            ) : (
              <div>No titles added to Watchlist</div>
            )}
          </div>
        </Suspense>
      </div>
    </>
  );
}
