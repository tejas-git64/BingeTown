"use client";

import { ContentType, Movie } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import { memo, Suspense, useEffect, useRef, useState } from "react";
import React from "react";
import MovieTitle from "../MovieTitle/MovieTitle";
import Loading from "./loading";

const isSameSection = (prevProps: ContentType, nextProps: ContentType) => {
	return prevProps.heading === nextProps.heading;
};

// eslint-disable-next-line react/display-name
export const MovieSection = memo(({ heading, uri }: ContentType) => {
	const [movies, setMovies] = useState<Movie[] | null>(null);

	async function fetchMoviesData() {
		const response = await fetch(
			`https://api.themoviedb.org/3/${uri}?language=en-US&page=1`,
			{
				method: "GET",
				headers: {
					accept: "application/json",
					Authorization: process.env.TMDB_READ_ACCESS_KEY as string,
				},
			}
		);
		const data = await response.json();
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		data && setMovies(data.results);
	}

	const { push } = useRouter();
	const sectionRef = useRef(null);
	const introptions = {
		rootMargin: "200px",
		threshold: 1.0,
	};

	useEffect(() => {
		const titleObserver = new IntersectionObserver((enteries) => {
			enteries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (movies === null) fetchMoviesData();
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

	const MovieSectionComponent = () => {
		return (
			<div
				id={"latest"}
				className='mx-auto flex h-[310px] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto'>
				{movies?.map((movie: Movie) => (
					<div key={movie.id} className='mr-2 sm:mr-4'>
						<MovieTitle key={movie.id} {...movie} />
					</div>
				))}
			</div>
		);
	};

	const DataComponent = () => {
		if (!movies) {
			throw new Promise<void>((resolve): void => {
				setTimeout(() => resolve(), 100);
			});
		} else {
			return <MovieSectionComponent />;
		}
	};

	return (
		<>
			<section
				id={heading}
				ref={sectionRef}
				className='titles mx-auto my-4 h-auto w-full md:h-auto'>
				<h2
					onClick={() => push("/movies")}
					className='mx-auto w-full cursor-pointer text-left text-lg font-extrabold text-white'>
					{heading}
				</h2>
				<Suspense fallback={<Loading key={heading} />}>
					<DataComponent />
				</Suspense>
			</section>
		</>
	);
}, isSameSection);
