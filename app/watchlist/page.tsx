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
          {data?.watchlist.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
                gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
              className="protected-container-parent"
            >
              {data?.watchlist.watchlist?.map((title: WatchListTitle) => (
                <div key={uuidv4()} className="mx-auto w-min">
                  <WatchTitle {...title} docRef={data.docRef} />
                </div>
              ))}
            </div>
          ) : (
            <div className="-mt-14 flex h-full w-full flex-col items-center justify-center">
              <p className="mb-10 whitespace-nowrap text-center text-5xl text-neutral-200">
                (´。＿。｀)
              </p>
              <p className="whitespace-nowrap text-center text-xl text-neutral-200">
                No titles added to your watchlist
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </>
  );
}
