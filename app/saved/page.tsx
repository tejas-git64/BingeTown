import { Suspense, useEffect, useState } from "react";
import { SavedTitleType, SavedTypes } from "../../types/LayoutTypes";
import MovieShowFallback from "../movies/loading";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/Firebase";
import SavedTitle from "@/components/SavedTitle/SavedTitle";

export default function Saved() {
	const [saved, setSaved] = useState<SavedTypes | null>(null);

	const getSavedTitles = () => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const savedRef = doc(db, "saved", uid);

				(async function getSavedData() {
					//Saved data
					const savedDoc = await getDoc(savedRef);
					const savedData = savedDoc.data();
					if (savedData) {
						setSaved(savedData);
					}
				})();
			}
		});
		return () => unsubscribe();
	};

	useEffect(() => {
		getSavedTitles();
	}, []);

	const SavedComponent = () => {
		return (
			<>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
						gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
					}}
					className='h-auto gap-x-4 gap-y-4 md:gap-x-6'>
					{saved?.savedtitles ? (
						saved.savedtitles.map((title: SavedTitleType) => (
							<div key={title.id} className='mx-auto w-min'>
								<SavedTitle {...title} />
							</div>
						))
					) : (
						<div>You have no saved titles</div>
					)}
				</div>
			</>
		);
	};

	const DataComponent = () => {
		if (!saved?.savedtitles) {
			throw new Promise<void>((resolve) => {
				setTimeout(resolve, 0);
			});
		} else {
			return <SavedComponent />;
		}
	};

	return (
		<>
			<div className='max-h-auto h-full w-full bg-neutral-900 px-5 pb-2 pt-12 text-left md:px-6'>
				<p className='my-4 py-2 text-base font-bold text-white md:text-lg'>
					Saved
				</p>
				<Suspense fallback={<MovieShowFallback />}>
					<DataComponent />
				</Suspense>
			</div>
		</>
	);
}
