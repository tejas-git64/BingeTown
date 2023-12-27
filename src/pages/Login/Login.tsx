import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthError, Credentials } from "../Auth";
import {
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { auth, db, googleProvider } from "../../config/Firebase";
import googlelogo from "../../assets/images/icons8-google-48.png";
import { motion } from "framer-motion";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NameContext } from "../Layout/Layout";

export default function Login() {
	const navigate = useNavigate();
	const [isDisabled, setIsDisabled] = useState(false);
	const [error, setError] = useState<string | undefined>("");
	const loginContext = useContext(NameContext);
	const [loggedIn, setLoggedIn] = useState(false);
	const [creds, setCreds] = useState<Credentials>({
		email: "",
		password: "",
	});

	function getAuthStatus(err: AuthError) {
		switch (true) {
			case err.code === "auth/invalid-email":
				return "Invalid email format";
				break;
			case err.code === "auth/user-disabled":
				return "User account is disabled";
				break;
			case err.code === "auth/user-not-found":
				return "User account not found";
				break;
			case err.code === "auth/wrong-password":
				return "Entered wrong password";
				break;
			default:
				return "";
				break;
		}
	}

	//Form Validation Function
	function formValidation() {
		if (creds.email.length === 0 || creds.password.length === 0) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const { name, value } = e.currentTarget;
		setCreds((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	const logIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, creds.email, creds.password);
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
					setTimeout(() => {
						navigate("/home");
					}, 1000);
				}
			});
		} catch (error: any) {
			console.error(error);
			const authError = getAuthStatus(error);
			setError(authError);
		}
	};

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			onAuthStateChanged(auth, (user) => {
				(async () => {
					//Creating documents from google login
					if (user) {
						const userRef = doc(db, "users", user.uid);
						const userSnap = await getDoc(userRef);
						const savedRef = doc(db, "saved", user.uid);
						const savedSnap = await getDoc(savedRef);
						const watchRef = doc(db, "watchlist", user.uid);
						const watchSnap = await getDoc(watchRef);
						setLoggedIn(true);
						if (userSnap.exists() && savedSnap.exists() && watchSnap.exists()) {
							setTimeout(() => {
								navigate("/home");
							}, 100);
						} else {
							try {
								//Initialising Users document
								await setDoc(doc(db, "users", user.uid), {
									email: user.email,
									fullname: user.displayName,
									uid: user.uid,
								});
								//Initialising Saved document
								await setDoc(doc(db, "saved", user.uid), {
									savedtitles: [],
									uid: user.uid,
								});
								//Initialising Watchlist document
								await setDoc(doc(db, "watchlist", user.uid), {
									uid: user.uid,
									watchlist: [],
								});
								setTimeout(() => {
									navigate("/home");
								}, 100);
							} catch (err) {
								console.log(err);
							}
						}
					}
				})();
			});
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		formValidation();
	}, [creds.email.length, creds.password.length]);

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
					duration: 1,
					delay: 0.5,
				}}
				className='relative grid h-[calc(100dvh-0dvh)] w-full place-items-center bg-neutral-800 p-4'>
				<Link
					to='/'
					className='absolute right-5 top-5 h-14 w-auto font-bold text-zinc-500 hover:text-teal-400'>
					⬅ Back to site
				</Link>
				<form className='flex h-auto w-full flex-col items-start justify-center rounded-xl bg-zinc-900 p-8 px-6 shadow-xl transition-all delay-[2] ease-out md:w-[450px] md:px-10'>
					<h2 className='mb-14 w-full whitespace-nowrap text-2xl font-extrabold text-teal-700'>
						Login
					</h2>
					<label htmlFor='email' className='text-left font-bold text-gray-600'>
						Email
					</label>
					<input
						type='email'
						name='email'
						onChange={handleChange}
						placeholder='Enter email address'
						className={` mb-6
						 h-12 w-full rounded-lg border-none bg-neutral-700 px-3 font-bold text-zinc-300 outline-none placeholder:text-gray-400`}
						required
					/>
					<label
						htmlFor='password'
						className='text-left font-bold text-gray-600'>
						Password
					</label>
					<input
						type='password'
						name='password'
						onChange={handleChange}
						placeholder='Enter your password'
						className={`mb-10 h-12 w-full rounded-lg border-none bg-neutral-700 px-3 font-bold text-zinc-300 outline-none placeholder:text-gray-400`}
						required
					/>
					{error && (
						<h4 className='mx-auto -mt-6 mb-4 w-full rounded-md p-2 font-semibold text-red-500 transition-all delay-[2s] ease-in md:w-80'>
							{error}
						</h4>
					)}
					{loggedIn && (
						<h4 className='mx-auto -mt-4 mb-8 w-full rounded-md bg-green-500 p-3 font-bold text-black transition-all delay-[2s] ease-in md:w-80'>
							Logged in ✔️
						</h4>
					)}
					<button
						onClick={logIn}
						type='submit'
						disabled={isDisabled}
						className={`${
							isDisabled
								? "cursor-not-allowed brightness-50"
								: "bg-black text-gray-200"
						} mx-auto -mt-2 h-14 w-full border-none bg-black font-bold tracking-wider text-gray-200 outline-none md:w-80`}>
						Continue Binging 🍿🍾
					</button>
					<Link
						to='/signup'
						className='mx-auto my-4 w-full text-zinc-500 hover:text-teal-400 md:w-72'>
						Don't have an account ?
					</Link>
					<div className='mx-auto mb-8 mt-4 h-[0.5px] w-full border-t-2 border-zinc-700 md:w-80'>
						<p className='mx-auto -mt-[15px] h-10 w-12 bg-zinc-900 text-sm'>
							or
						</p>
					</div>
					<button
						onClick={signInWithGoogle}
						type='button'
						className='mx-auto mb-4 flex h-12 w-full items-center justify-center border-none bg-white font-bold outline-none md:w-80'>
						{" "}
						<p className='mr-4 text-base font-semibold text-gray-500'>
							Sign in with Google
						</p>
						<img src={googlelogo} alt='google' className='h-8 w-8' />
					</button>
				</form>
			</motion.div>
		</>
	);
}
