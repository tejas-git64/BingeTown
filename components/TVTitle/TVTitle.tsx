"use client";

import { memo, useEffect, useRef, useState } from "react";
import menu from "@/public/svgs/menu-vertical-svgrepo-com.svg";
import save from "@/public/svgs/save-svgrepo-com.svg";
import watchlist from "@/public/svgs/add-to-queue-svgrepo-com.svg";
import { doc, DocumentData, DocumentReference } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase";
import { TVDiscover } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addToSavedList, addToWatchList } from "@/firebase/requests";

const isSame = (prevProps: { id: number }, nextProps: { id: number }) => {
  return prevProps.id === nextProps.id;
};

const TVTitle = memo(
  ({ name, first_air_date, vote_average, poster_path, id }: TVDiscover) => {
    const { push } = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const savedDocRef = useRef<DocumentReference<
      DocumentData,
      DocumentData
    > | null>(null);
    const watchDocRef = useRef<DocumentReference<
      DocumentData,
      DocumentData
    > | null>(null);
    const year = new Date(first_air_date).getFullYear();

    function revealMenu(
      e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
    ) {
      e.stopPropagation();
      e.preventDefault();
      setShowMenu(true);
    }

    function showTVShow(
      e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
    ) {
      e.preventDefault();
      if (id) push(`/shows/${id}`);
    }

    useEffect(() => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        savedDocRef.current = doc(db, "saved", uid);
        watchDocRef.current = doc(db, "watchlist", uid);
      }
    }, []);

    return (
      <>
        <div onClick={showTVShow} role="link" className="title-container">
          <Image
            src={`https://image.tmdb.org/t/p/w154/${poster_path}`}
            alt="movie-poster"
            width={154}
            height={231}
            className="title-image"
          />
          <p className="title-tag tag-tv">TV</p>
          <h3 className="title-name">{name}</h3>
          <div className="title-parent">
            <div className="title-child-1">
              <div className="flex">
                <h4 className="title-rating">Rating</h4>
                <h4 className="rating-value">
                  {vote_average === 0 ? "NA" : `${vote_average.toFixed(1)}`}
                </h4>
              </div>
              <h3 className="title-year">{year}</h3>
            </div>
            <button
              onClick={revealMenu}
              style={{
                border: "none",
                outline: "none",
              }}
              className="-mr-2 h-auto bg-transparent p-0"
            >
              <Image src={menu} alt="title-menu" className="h-6 w-6" />
            </button>
          </div>
          <div
            onMouseLeave={(e) => {
              e.preventDefault();
              setShowMenu(false);
            }}
            className={`${showMenu ? "absolute" : "hidden"} title-btn-menu`}
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToWatchList(
                  Number(id),
                  "tv",
                  name,
                  poster_path,
                  vote_average,
                  first_air_date,
                  watchDocRef.current as DocumentReference<
                    DocumentData,
                    DocumentData
                  >,
                );
              }}
              className="title-btn"
            >
              <h4 className="title-btn-text">Add to watchlist</h4>
              <Image
                src={watchlist}
                alt="add"
                className="title-watchlist-img"
              />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToSavedList(
                  Number(id),
                  name,
                  poster_path,
                  vote_average,
                  first_air_date,
                  "tv",
                  savedDocRef.current as DocumentReference<
                    DocumentData,
                    DocumentData
                  >,
                );
              }}
              className="title-btn"
            >
              <h4 className="title-btn-text">Save</h4>
              <Image src={save} alt="save" className="title-save-img" />
            </button>
          </div>
        </div>
      </>
    );
  },
  isSame,
);

TVTitle.displayName = "MovieTitle";
export default TVTitle;
