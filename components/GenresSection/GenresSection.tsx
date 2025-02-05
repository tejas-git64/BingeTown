"use client";

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { GenreType, Movie } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import React, { memo, useEffect, useRef, useState } from "react";
import { Suspense } from "react";
import MovieTitle from "../MovieTitle/MovieTitle";
import Loading from "../MovieSection/loading";

const isSameGenre = (prevProps: GenreType, nextProps: GenreType) => {
	return prevProps.id === nextProps.id;
};

// eslint-disable-next-line react/display-name
export const GenresSection = memo(({ id, heading }: GenreType) => {
	const [genreMovies, setGenreMovies] = useState<Movie[] | null>(null);
	const { push } = useRouter();
	const sectionRef = useRef(null);
	const introptions = {
		rootMargin: "200px",
		threshold: 1.0,
	};
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization: process.env.TMDB_READ_ACCESS_KEY as string,
		},
	};

	async function fetchGenreData() {
		const response = await fetch(
			`https://api.themoviedb.org/3/discover/movie?include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${id}`,
			options
		);
		const data = await response.json();
		data && setGenreMovies(data.results);
	}

	useEffect(() => {
		const titleObserver = new IntersectionObserver((enteries) => {
			enteries.forEach((entry) => {
				if (entry.isIntersecting) {
					genreMovies === null && fetchGenreData();
				}
			});
		}, introptions);
		if (sectionRef.current) {
			titleObserver.observe(sectionRef.current);
		}
		// Cleanup the observer on component unmount
		return () => {
			titleObserver.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sectionRef.current]);

	const GenresSectionComponent = () => {
		return (
			<div
				id='genre'
				className='mx-auto flex h-[310px] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto'>
				{genreMovies?.map((movie: Movie) => (
					<div key={movie.id} className='mr-2 sm:mr-4'>
						<MovieTitle {...movie} key={movie.id} />
					</div>
				))}
			</div>
		);
	};

	const DataComponent = () => {
		if (!genreMovies) {
			throw new Promise<void>((resolve): void => {
				setTimeout(() => resolve(), 0);
			});
		} else {
			return <GenresSectionComponent />;
		}
	};

	return (
		<>
			<section
				ref={sectionRef}
				className='titles mx-auto my-4 h-auto w-full md:h-auto'>
				<h2
					onClick={() => push("/movies")}
					className='mx-auto w-full cursor-pointer text-left text-lg font-extrabold text-white'>
					{heading}
				</h2>
				<Suspense fallback={<Loading />}>
					<DataComponent />
				</Suspense>
			</section>
		</>
	);
}, isSameGenre);
