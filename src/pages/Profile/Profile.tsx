import { useContext, useEffect, useState } from "react";
import { NameContext } from "../Layout/Layout";
import close from "../../assets/images/icons8-close-48.png";
import { auth, db } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Profile() {
	const ProfileContext = useContext(NameContext);
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const SignOut = async () => {
		ProfileContext?.profilePage[1](false);
		try {
			await signOut(auth);
			onAuthStateChanged(auth, (user) => {
				if (user === null) {
					navigate("/");
				}
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				const userRef = doc(db, "users", uid);

				(async function getSavedData() {
					//Saved data
					const userDoc = await getDoc(userRef);
					const userData = userDoc.data();
					if (userData) {
						setName(userData.fullname);
						setEmail(userData.email);
					}
				})();
			}
		});
		return () => unsubscribe();
	}, []);

	const pagevar = {
		initial: {
			opacity: 0,
			translateY: -20,
		},
		animate: {
			opacity: 1,
			translateY: 0,
		},
		exit: {
			opacity: 0,
			translateY: -20,
		},
		transition: {
			type: "spring",
			duration: 3,
			ease: "easeIn",
		},
	};

	return (
		<>
			<motion.div
				variants={pagevar}
				initial='initial'
				animate='animate'
				exit='exit'
				transition={{
					delay: 0.5,
					duration: 1,
				}}
				className={`z-20 mx-auto flex h-full w-full items-center justify-center bg-black ${
					ProfileContext?.profilePage[0] ? "absolute" : "hidden"
				} left-0 top-0`}>
				<div className='flex h-[calc(100dvh-30dvh)] w-[calc(100%-10%)] flex-col items-center justify-start rounded-xl bg-neutral-800 p-4 px-6 sm:w-[calc(100%-40%)] sm:rounded-lg md:w-[calc(100%-50%)] lg:w-[calc(100%-60%)] xl:w-[calc(100%-60%)] 2xl:w-[calc(100%-70%)]'>
					<div className='flex w-full items-center justify-between sm:mb-5'>
						<p className='text-teal-400'>Your Profile</p>
						<button
							onClick={() => ProfileContext?.profilePage[1](false)}
							className='border-none bg-transparent p-0 outline-none'>
							<img src={close} alt='close-icon' className='h-5 w-5' />
						</button>
					</div>
					<div className='flex h-full w-full flex-col items-center justify-around'>
						<img
							src={
								auth.currentUser?.photoURL ||
								`https://api.dicebear.com/6.x/personas/svg`
							}
							alt='profile-img'
							className='h-24 w-24 rounded-full bg-neutral-700'
						/>
						<div className='flex h-auto w-full flex-col justify-center text-center'>
							<div className='mr-2 h-full w-full rounded-lg bg-transparent py-4 pl-4 pr-2 text-base font-bold text-white placeholder:text-neutral-600'>
								Name<p className='text-xl text-fuchsia-500'>{name}</p>
							</div>
							<div className='mr-2 h-full w-full rounded-lg bg-transparent py-4 pl-4 pr-2 text-base font-bold text-white placeholder:text-neutral-600'>
								Email<p className='text-xl text-fuchsia-500'>{email}</p>
							</div>
							<div className='mr-2 h-full w-full rounded-lg bg-transparent py-4 pl-4 pr-2 text-base font-bold text-white placeholder:text-neutral-600'>
								Titles in watchlist
								<p className='text-xl text-fuchsia-500'>
									{ProfileContext?.watchlist[0]?.watchlist.length}
								</p>
							</div>
							<div className='mr-2 h-full w-full rounded-lg bg-transparent py-4 pl-4 pr-2 text-base font-bold text-white placeholder:text-neutral-600'>
								Saved titles
								<p className='text-xl text-fuchsia-500'>
									{ProfileContext?.saved[0]?.savedtitles.length}
								</p>
							</div>
						</div>
						<button
							onClick={SignOut}
							className='rounded-full border-none bg-teal-500 p-2.5 px-10 text-base font-bold text-black outline-none'>
							Sign out
						</button>
					</div>
				</div>
			</motion.div>
		</>
	);
}
