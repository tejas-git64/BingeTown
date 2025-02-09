"use client";

import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import search from "@/public/svgs/search-alt-2-svgrepo-com.svg";
import menu from "@/public/svgs/menu-alt-05-svgrepo-com.svg";
import { MultiSearch } from "../../types/Search";
import logo from "@/public/images/icons8-video-48.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutContextTypes } from "@/types/LayoutTypes";
import Image from "next/image";
import { auth } from "@/firebase/Firebase";
import { GlobalStore } from "@/store/GlobalStore";
import { AuthContext } from "@/auth/AuthContext";

export default function Nav() {
  const path = usePathname();
  const [searchResults, setSearchResults] = useState<MultiSearch | null>(null);
  const [query, setQuery] = useState("");
  const { setSideNav } = useContext<LayoutContextTypes>(GlobalStore);
  const { isLoggedIn } = useContext(AuthContext);
  const { push } = useRouter();
  const options = useMemo(() => {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.TMDB_READ_ACCESS_KEY as string,
      },
    };
  }, []);

  function showTitle(mediaType: string, id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    mediaType === "tv" ? push(`/tvshows/${id}`) : push(`/movies/${id}`);
    setSearchResults(null);
  }

  const getSearchResults = useCallback(async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
      options,
    );
    const data = await res.json();
    const results = data.results;
    const min: MultiSearch = results.filter(
      (res: { media_type: string }) => res.media_type !== "person",
    );
    setSearchResults(min.slice(0, 5));
  }, [options, query]);

  useEffect(() => {
    if (query !== "") getSearchResults();
  }, [getSearchResults, query]);

  return (
    <nav
      className={`${
        path === "/login" || path === "/signup" || path === "/not-found"
          ? "hidden"
          : ""
      } z-30 flex h-14 w-full items-center justify-between bg-gradient-to-t from-neutral-900 to-black pl-3 pr-5 transition-all duration-[3] ease-out md:pl-4 md:pr-6`}
    >
      <Link
        href="/"
        className="ml-0.5 mr-20 flex items-center text-2xl font-bold text-teal-400 sm:mr-40"
      >
        <Image src={logo} alt="icon" className="h-8 w-8 md:h-10 md:w-10" />
        <p className="text-lg text-teal-400 sm:text-xl">BingeTown</p>
      </Link>
      <div className="flex w-full items-center justify-end">
        <div className="hidden w-[calc(100%-20%)] items-center md:justify-end lg:-ml-0 lg:flex 2xl:max-w-[1330px]">
          <div
            className={`${
              path !== "/" ? "block" : "hidden"
            } relative -ml-28 mr-16 mt-1 h-auto w-full`}
          >
            {!["/search", "/"].includes(path) && (
              <input
                type="search"
                name="movie-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for your favorite movies, tv shows and more"
                className="hidden h-9 w-full rounded-full border-none bg-neutral-800 px-4 text-sm font-bold text-white outline-none placeholder:font-medium placeholder:text-neutral-500 lg:-ml-0 xl:block"
              />
            )}
            <ul className="absolute flex h-auto w-full flex-col items-end justify-start">
              {searchResults?.map((result) => (
                <div
                  key={result.id}
                  onClick={() => showTitle(result.media_type, result.id)}
                  className="mb-0.5 flex h-14 w-full items-center justify-between rounded-md bg-neutral-800 p-2 pr-6 hover:cursor-pointer hover:bg-gray-800"
                >
                  <div className="flex w-auto items-center justify-start overflow-x-hidden whitespace-nowrap">
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${result.backdrop_path}`}
                      alt="search-Image"
                      className="mr-4 hidden h-10 w-20 rounded-lg text-xs 2xl:block"
                    />
                    <div className="flex h-auto w-auto flex-col items-start justify-center">
                      <h3 className="text-left text-sm font-bold text-white">
                        {result.title}
                      </h3>
                      <div className="flex w-auto items-center justify-start">
                        <h4 className="mr-4 text-xs font-semibold text-gray-400">
                          Rating: {result.vote_average} ⭐
                        </h4>
                        <h4 className="text-xs font-semibold text-gray-400">
                          {result.release_date}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <p
                    className={`${
                      result.media_type === "tv"
                        ? "text-fuchsia-500"
                        : "text-yellow-400"
                    } py-2 pl-4 text-base uppercase`}
                  >
                    {result.media_type}
                  </p>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <Link
              href="/home"
              className="text-md mr-10 pt-3 font-bold text-white transition-all ease-out hover:text-teal-400 hover:shadow-[0px_2px_0px_#2dd4bf]"
            >
              Home
            </Link>
            <Link
              href="/movies"
              className="text-md mr-10 pt-3 font-bold text-white transition-all ease-out hover:text-teal-400 hover:shadow-[0px_2px_0px_#2dd4bf]"
            >
              Movies
            </Link>
            <Link
              href="/tvshows"
              className="text-md mr-12 whitespace-nowrap pt-3 font-bold text-white transition-all ease-out hover:text-teal-400 hover:shadow-[0px_2px_0px_#2dd4bf]"
            >
              TV Shows
            </Link>
          </div>
        </div>
        {path !== "/search" && (
          <button
            onClick={() => push("/search")}
            style={{
              border: "none",
              outline: "none",
            }}
            className="z-10 mr-12 flex-shrink-0 bg-transparent p-0 md:mr-3 lg:hidden"
          >
            <Image
              src={search}
              alt="search"
              width={24}
              height={24}
              className="mt-0.5 h-6 w-6 flex-shrink-0"
            />
          </button>
        )}
        <Link
          href="/signup"
          className={`${
            !auth.currentUser || !isLoggedIn ? "block" : "hidden"
          } duration-3 -ml-8 whitespace-nowrap rounded-full bg-teal-500 px-5 py-1 text-[14px] font-bold text-black transition-all ease-out hover:bg-teal-400 hover:text-black md:mx-4`}
        >
          Sign up
        </Link>
        <Link
          href="/login"
          className={`${
            !auth.currentUser || !isLoggedIn ? "hidden md:block" : "hidden"
          } duration-3 whitespace-nowrap rounded-full border-[1px] border-teal-500 px-5 py-1 text-[14px] font-bold text-teal-400 transition-colors ease-out hover:bg-teal-500 hover:text-black`}
        >
          Login
        </Link>
        <button
          onClick={() => setSideNav((prev) => !prev)}
          style={{
            border: "none",
            outline: "none",
          }}
          className={`${
            auth.currentUser && isLoggedIn ? "block" : "hidden"
          } h-7 w-7 flex-shrink-0 bg-transparent p-0 sm:h-10 sm:w-10 md:-mr-3 md:ml-3`}
        >
          <Image
            src={menu}
            alt="hamburger-menu"
            width={30}
            height={30}
            className="flex-shrink-0"
          />
        </button>
      </div>
    </nav>
  );
}
