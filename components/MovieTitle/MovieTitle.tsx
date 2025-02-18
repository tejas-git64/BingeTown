"use client";

import { memo, useEffect, useRef, useState } from "react";
import menu from "@/public/svgs/menu-vertical-svgrepo-com.svg";
import save from "@/public/svgs/save-svgrepo-com.svg";
import watchlist from "@/public/svgs/add-to-queue-svgrepo-com.svg";
import { Movie } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { auth, db } from "@/firebase/Firebase";
import { doc, DocumentData, DocumentReference } from "firebase/firestore";
import { addToWatchList, addToSavedList } from "@/firebase/requests";

const isSame = (prevProps: { id: number }, nextProps: { id: number }) => {
  return prevProps.id === nextProps.id;
};

const MovieTitle = memo(
  ({ title, release_date, vote_average, poster_path, id }: Movie) => {
    const { push } = useRouter();
    const [showMenu, setShowMenu] = useState(false);
    const year = new Date(release_date).getFullYear();
    const [imgSrc, setImgSrc] = useState("");
    const savedDocRef = useRef<DocumentReference<
      DocumentData,
      DocumentData
    > | null>(null);
    const watchDocRef = useRef<DocumentReference<
      DocumentData,
      DocumentData
    > | null>(null);

    function showMovie(
      e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
    ) {
      e.preventDefault();
      push(`/movies/${id}`);
    }

    useEffect(() => {
      const uid = auth.currentUser?.uid;
      if (uid) {
        savedDocRef.current = doc(db, "saved", uid);
        watchDocRef.current = doc(db, "watchlist", uid);
      }
    }, []);

    function pushToSaved(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
      e.stopPropagation();
      setShowMenu(false);
      if (savedDocRef.current) {
        addToSavedList(
          id,
          title,
          poster_path,
          vote_average,
          release_date.toString(),
          "movie",
          savedDocRef.current as DocumentReference<DocumentData, DocumentData>,
        );
      }
    }

    function pushToWatchlist(
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) {
      e.stopPropagation();
      setShowMenu(false);
      if (watchDocRef.current) {
        addToWatchList(
          id,
          "movie",
          title,
          poster_path,
          vote_average,
          release_date.toString(),
          watchDocRef.current as DocumentReference<DocumentData, DocumentData>,
        );
      }
    }

    useEffect(() => {
      setImgSrc(`https://image.tmdb.org/t/p/w154/${poster_path}`);
    }, [poster_path]);

    return (
      <>
        <div onClick={showMovie} role="link" className="title-container">
          <Image
            src={imgSrc ? imgSrc : "/public/images/image-fallback.webp"}
            alt="movie-poster"
            width={154}
            height={231}
            priority
            fetchPriority="high"
            onError={() => setImgSrc("/public/images/image-fallback.webp")}
            className="title-image"
          />
          <p className="title-tag tag-movie">MOVIE</p>
          <h3 className="title-name">{title}</h3>
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
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(true);
              }}
              style={{
                outline: "none",
              }}
              className="-mr-2 -mt-3 h-auto border-none bg-transparent p-0"
            >
              <Image src={menu} alt="title-menu" className="h-6 w-6" />
            </button>
          </div>
          <div
            onMouseLeave={() => setShowMenu(false)}
            className={`${showMenu ? "flex" : "hidden"} title-btn-menu`}
          >
            <button onClick={pushToWatchlist} className="title-btn">
              <h4 className="title-btn-text">Add to watchlist</h4>
              <Image
                src={watchlist}
                alt="add"
                className="title-watchlist-img"
              />
            </button>
            <button onClick={pushToSaved} className="title-btn">
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

MovieTitle.displayName = "MovieTitle";
export default MovieTitle;
