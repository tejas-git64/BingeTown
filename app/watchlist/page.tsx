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
      <div className="max-h-auto -mt-4 h-[100dvh] w-full bg-neutral-900 px-5 pb-2 text-left md:px-6">
        <p className="my-4 py-2 text-base font-bold text-white md:text-lg">
          WatchList
        </p>
        <Suspense fallback={<MovieShowFallback />}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
              gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
            }}
            className="mb-6 mt-4 h-auto gap-x-4 gap-y-4 md:gap-x-6"
          >
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
