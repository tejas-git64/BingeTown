"use client";

import MovieShowFallback from "@/app/movies/loading";
import WatchTitle from "@/components/WatchTitle/WatchTitle";
import { auth, db } from "@/firebase/Firebase";
import { WatchListTitle } from "@/types/LayoutTypes";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WatchlistContainer() {
  const [data, setData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function fetchWatchlist() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const watchRef = doc(db, "watchlist", uid);
        (async () => {
          //Watchlist data
          const watchDoc = await getDoc(watchRef);
          if (watchDoc) {
            setData({
              id: uid,
              watchlist: watchDoc.data() as DocumentData,
              docRef: watchRef,
            });
          }
          setIsLoading(false);
        })();
      }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    fetchWatchlist();
  }, []);

  return (
    <>
      {isLoading ? (
        <MovieShowFallback />
      ) : (
        <>
          {data && data?.watchlist.watchlist.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
                gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
              className="protected-container-parent"
            >
              {data.watchlist.watchlist?.map((title: WatchListTitle) => (
                <div key={uuidv4()} className="mx-auto w-min">
                  <WatchTitle
                    {...title}
                    docRef={data.docRef}
                    refetch={fetchWatchlist}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-[80dvh] max-h-full w-full flex-col items-center justify-center md:-mt-14">
              <p className="mb-10 whitespace-nowrap text-center text-3xl text-neutral-200 md:text-5xl">
                (´。＿。｀)
              </p>
              <p className="whitespace-nowrap text-center text-base text-neutral-200 md:text-xl">
                No titles added to your watchlist
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}
