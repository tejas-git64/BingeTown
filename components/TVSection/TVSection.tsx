"use client";

import { ContentType, TVDiscover } from "@/types/HomeTypes";
import { useRouter } from "next/navigation";
import React, { memo, useState } from "react";
import { Suspense, useEffect, useRef } from "react";
import TVTitle from "@/components/TVTitle/TVTitle";
import Loading from "@/components/MovieSection/loading";

const isSameTVList = (prevProps: ContentType, nextProps: ContentType) => {
	return prevProps.heading === nextProps.heading;
};

// eslint-disable-next-line react/display-name
export const TVSection = memo(({ heading, uri }: ContentType) => {
	const [shows, setShows] = useState<TVDiscover[] | null>(null);
	const { push } = useRouter();
	async function fetchTVData() {
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
		setShows(data.results);
	}

	const tvsectionRef = useRef(null);

	useEffect(() => {
		const titleObserver = new IntersectionObserver(
			(enteries) => {
				enteries.forEach((entry) => {
					if (entry.isIntersecting) {
						// eslint-disable-next-line @typescript-eslint/no-unused-expressions
						shows === null && fetchTVData();
					}
				});
			},
			{
				rootMargin: "400px",
				threshold: 0.2,
			}
		);
		if (tvsectionRef.current) {
			titleObserver.observe(tvsectionRef.current);
		}
		// Cleanup the observer on component unmount
		return () => {
			titleObserver.disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tvsectionRef.current]);

	const TVSectionComponent = () => {
		return (
			<div
				id='latest'
				className='mx-auto flex h-[310px] overflow-y-hidden overflow-x-scroll pt-2 md:h-auto'>
				{shows &&
					shows?.map((show: TVDiscover) => (
						<div key={show.id} className='mr-2 sm:mr-4'>
							<TVTitle key={show.id} {...show} />
						</div>
					))}
			</div>
		);
	};

	const DataComponent = () => {
		if (shows) {
			return <TVSectionComponent />;
		} else {
			throw new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 0);
			});
		}
	};

	return (
		<>
			<section
				ref={tvsectionRef}
				id={heading}
				className='titles mx-auto my-4 h-auto w-full md:h-auto'>
				<h2
					onClick={() => push("/tvshows")}
					className='mx-auto w-full cursor-pointer text-left text-lg font-extrabold text-white'>
					{heading}
				</h2>
				<Suspense fallback={<Loading key={heading} />}>
					<DataComponent />
				</Suspense>
			</section>
		</>
	);
}, isSameTVList);
