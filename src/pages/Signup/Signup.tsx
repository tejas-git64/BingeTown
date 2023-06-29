import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../config/Firebase";
import { useCallback, useContext, useEffect, useState } from "react";
import { NameContext } from "../Layout/Layout";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
} from "firebase/auth";
import { AuthError } from "../Auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import googlelogo from "../../assets/images/icons8-google-48.png";
import { motion } from "framer-motion";

export default function SignUp() {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [error, setError] = useState<string>("");
	const [signedIn, setSignedIn] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const SignContext = useContext(NameContext);
	const navigate = useNavigate();

	function getAuthStatus(err: AuthError) {
		switch (true) {
			case err.code === "auth/invalid-email":
				return "Invalid email format";
				break;
			case err.code === "auth/user-disabled":
				return "User account is disabled";
				break;
			case err.code === "auth/internal-error":
				return "Internal Error occured, try again later";
				break;
			case err.code === "auth/email-already-exists":
				return "User already exists";
				break;
			case err.code === "auth/wrong-password":
				return "Entered wrong password";
				break;
			default:
				return "Unknown error occurred";
				break;
		}
	}

	const formValidation = useCallback(() => {
		if (
			email.length === 0 ||
			pass.length === 0 ||
			SignContext?.name[0].length === 0
		) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}, [SignContext?.name, email.length, pass.length]);

	function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		if (isDisabled === false) {
			(async () => {
				try {
					await createUserWithEmailAndPassword(auth, email, pass);
					onAuthStateChanged(auth, (user) => {
						(async () => {
							if (user) {
								//Initialising Users document
								await setDoc(doc(db, "users", user.uid), {
									email: email.toString(),
									fullname: SignContext?.name[0].toString(),
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
								const docRef = doc(db, "users", user.uid);
								const docSnap = await getDoc(docRef);
								if (docSnap.exists()) {
									setSignedIn(true);
									setTimeout(() => {
										navigate("/home");
									}, 2000);
								} else {
									window.alert("Unknown error occured, try again?");
								}
							}
						})();
					});
				} catch (err: any) {
					const authError = getAuthStatus(err);
					setError(authError);
					console.error(error);
				}
			})();
		} else {
			formValidation();
		}
	}

	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, googleProvider);
			onAuthStateChanged(auth, (user) => {
				if (user) {
					try {
						navigate("/home");
					} catch (err) {
						window.alert(`Error:${err}, Failed to login in`);
					}
				}
			});
		} catch (err: any) {
			const authError = getAuthStatus(err);
			setError(authError);
		}
	};

	useEffect(() => {
		formValidation();
	}, [email.length, formValidation, pass.length]);

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
				className='grid h-[calc(100dvh-0dvh)] w-full place-items-center bg-neutral-800 p-4'>
				<Link
					to='/'
					className='absolute right-5 top-5 h-14 w-auto font-bold text-zinc-500 hover:text-teal-400'>
					⬅ Back to site
				</Link>
				<form className='mt-10 flex h-[700px] w-full flex-col items-start justify-center rounded-xl bg-zinc-900 p-4 px-6 shadow-xl md:w-[450px] md:px-10'>
					<h2 className='mb-14 w-full whitespace-nowrap text-2xl font-extrabold text-teal-700'>
						Create an account
					</h2>
					<label
						htmlFor='fullname'
						className='text-left font-bold text-gray-600'>
						Full name
					</label>
					<input
						type='text'
						name='fullname'
						onChange={(e) => SignContext?.name[1](e.target.value)}
						placeholder='Enter your full name'
						className={`mb-6 h-12 w-full rounded-lg border-none bg-neutral-700 px-3 font-bold text-zinc-300 outline-none placeholder:text-gray-400`}
						required
					/>
					<label htmlFor='email' className='text-left font-bold text-gray-600'>
						Email
					</label>
					<input
						type='email'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter email address'
						className={`mb-6 h-12 w-full rounded-lg border-none bg-neutral-700 px-3 font-bold text-zinc-300 outline-none placeholder:text-gray-400`}
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
						onChange={(e) => setPass(e.target.value)}
						placeholder='Enter your password'
						className={`mb-4 h-12 w-full rounded-lg border-none bg-neutral-700 px-3 font-bold text-zinc-300 outline-none placeholder:text-gray-400`}
						required
					/>
					{error && (
						<h4
							className={`mx-auto mt-1 w-full rounded-md text-center font-extrabold
							 text-red-500 md:w-80`}>
							{error}
						</h4>
					)}
					{signedIn && (
						<h4
							className={`mx-auto mt-2 w-full rounded-md bg-green-500 py-2 text-center font-extrabold text-black md:w-80`}>
							Signed up successfully!
						</h4>
					)}
					<button
						onClick={signUp}
						type='submit'
						disabled={isDisabled}
						className={`${
							isDisabled
								? "cursor-not-allowed bg-neutral-800 text-gray-500 brightness-50"
								: "bg-black text-gray-200"
						} mx-auto mt-4 h-14 w-full border-none font-bold tracking-wider outline-none md:w-80`}>
						Start Binging 🎉🍿
					</button>
					<Link
						to='/login'
						className='mx-auto my-4 w-full text-zinc-500 hover:text-teal-400 md:w-80'>
						Have an account ? Login
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
