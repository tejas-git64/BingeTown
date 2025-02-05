import { useContext, useEffect, useState } from "react";
import close from "@/public/svgs/bookmark-x-svgrepo-com.svg";
import { auth, db } from "../../config/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
	doc,
	DocumentData,
	DocumentReference,
	getDoc,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import { LayoutContext } from "@/app/layout";
import { LayoutContextTypes } from "@/types/LayoutTypes";
import Image from "next/image";

export default function Profile({ svg }: { svg: number }) {
	const { profilePage, setProfilePage } =
		useContext<LayoutContextTypes>(LayoutContext);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const SignOut = async () => {
		setProfilePage(false);
		try {
			await signOut(auth);
			onAuthStateChanged(auth, (user) => {
				if (user === null) {
					redirect("/");
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	async function getSavedData(
		userRef: DocumentReference<DocumentData, DocumentData>
	) {
		//Saved data
		const userDoc = await getDoc(userRef);
		const userData = userDoc.data();
		if (userData) {
			setName(userData.fullname);
			setEmail(userData.email);
		}
	}
	useEffect(() => {
		if (!email && !name) {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (user) {
					const uid = user.uid;
					const userRef = doc(db, "users", uid);
					getSavedData(userRef);
				}
			});
			return () => unsubscribe();
		}
	}, [email, name]);

	return (
		<>
			<div
				style={{
					background: "linear-gradient(0deg,#000,#0006)",
				}}
				className={`z-20 mx-auto flex h-full w-full items-center justify-center ${
					profilePage ? "absolute" : "hidden"
				} left-0 top-0`}>
				<div className='flex h-auto w-[calc(100%-10%)] flex-col rounded-xl bg-neutral-800 p-4 px-6 pb-8 sm:w-[calc(100%-40%)] sm:rounded-lg md:w-[calc(100%-50%)] lg:w-[calc(100%-60%)] xl:w-[calc(100%-60%)] 2xl:w-[calc(100%-70%)]'>
					<div className='flex w-full items-center justify-between pb-6'>
						<p className='text-base text-teal-400'>Your Profile</p>
						<button
							onClick={() => setProfilePage(false)}
							className='border-none bg-transparent p-0 outline-none'>
							<Image src={close} alt='close-icon' className='h-5 w-5' />
						</button>
					</div>
					<div className='flex h-full w-full flex-col items-start justify-around'>
						<div className='flex w-full items-center justify-around md:items-start'>
							<Image
								src={
									auth.currentUser?.photoURL ||
									`https://api.dicebear.com/7.x/notionists/svg?seed=${svg}&size=32&backgroundColor=b6e3f4,c0aede&backgroundType=gradientLinear,solid&glassesProbability=50`
								}
								alt='profile-Image'
								className='h-16 w-16 rounded-full bg-neutral-700 md:h-24 md:w-24'
							/>
							<div className='flex h-auto w-[70%] flex-col items-center justify-start text-left'>
								<div className='my-1 h-full w-full rounded-lg bg-transparent pl-4'>
									<p className='text-xs text-neutral-400'>Name</p>
									<p className='text-base font-medium text-white'>{name}</p>
								</div>
								<div className='my-1 h-full w-full rounded-lg bg-transparent pl-4'>
									<p className='text-xs text-neutral-400'>Email</p>
									<p className='text-base font-medium text-white'>{email}</p>
								</div>
							</div>
						</div>
						<div className='my-6 flex h-auto w-full flex-col items-start justify-center pl-2'>
							<div className='my-2 flex h-auto w-full items-center justify-start'>
								<p className='mr-2 text-sm font-medium text-neutral-400'>
									No of titles in watchlist:
								</p>
								<p className='text-sm text-white'>
									{profilePage?.watchlist.length}
								</p>
							</div>
							<div
								className='my-2 flex h-full w-full items-center justify-start
							'>
								<p className='mr-2 text-sm font-medium text-neutral-400'>
									No of titles saved:
								</p>
								<p className='text-sm text-white'>
									{ProfileContext?.saved[0]?.savedtitles.length}
								</p>
							</div>
						</div>
						<button
							onClick={SignOut}
							className='mx-auto rounded-full border-none bg-teal-500 p-2 px-8 text-sm font-bold text-black outline-none'>
							Sign out
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
