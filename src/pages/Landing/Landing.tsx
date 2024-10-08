import movie from "../../assets/images/stranger things.jpg";
import review from "../../assets/svgs/ratings.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import bg480 from "../../assets/images/landing/landing-default-480px.webp";
import bg768 from "../../assets/images/landing/landing-default-768px.webp";
import bg1024 from "../../assets/images/landing/landing-default-1024px.webp";
import bg1280 from "../../assets/images/landing/landing-default-1280px.webp";
import bg1536 from "../../assets/images/landing/landing-default-1536px.webp";
import bg2160 from "../../assets/images/landing/landing-default-2160px.webp";

export default function Landing() {
	const navigate = useNavigate();
	const [bgImg, setBgImg] = useState<string>("");

	function handleResize() {
		switch (true) {
			case innerWidth <= 480:
				setBgImg(bg480);
				break;
			case innerWidth <= 768:
				setBgImg(bg768);
				break;
			case innerWidth <= 1024:
				setBgImg(bg1024);
				break;
			case innerWidth <= 1280:
				setBgImg(bg1280);
				break;
			case innerWidth <= 1536:
				setBgImg(bg1536);
				break;
			case innerWidth <= 2160:
				setBgImg(bg2160);
				break;
			default:
				setBgImg(bg2160);
				break;
		}
	}

	const pagevar = {
		initial: {
			opacity: 0,
			translateY: -5,
		},
		animate: {
			opacity: 1,
			translateY: 0,
		},
		exit: {
			opacity: 0,
			translateY: -5,
		},
		transition: {
			type: "spring",
			duration: 0.5,
			ease: "easeIn",
		},
	};

	const h2var = {
		initial: {
			translateX: -10,
			opacity: 0,
		},
		animate: {
			translateX: 0,
			opacity: 1,
		},
		exit: {
			translateY: 10,
			opacity: 0,
		},
	};

	const pvar = {
		initial: {
			translateY: 5,
			opacity: 0,
		},
		animate: {
			translateY: 0,
			opacity: 1,
		},
	};

	function AllowAccess() {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				navigate("/home");
			} else {
				navigate("/signup");
			}
		});
	}

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	});

	return (
		<>
			<motion.div
				variants={pagevar}
				initial='initial'
				animate='animate'
				exit='exit'
				transition={{
					duration: 0.5,
				}}
				className='h-auto w-full font-jakartaSans'>
				<motion.div
					style={{
						backgroundImage: `linear-gradient(180deg, #000, #0005) , url("${bgImg}")`,
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundAttachment: "fixed",
						backgroundSize: "cover",
					}}
					className='flex h-[700px] w-full flex-col items-center justify-center bg-cover px-10 pt-10 ease-in-out md:h-[650px] lg:h-[872px]'>
					<motion.h2
						variants={h2var}
						transition={{
							duration: 0.5,
						}}
						className='text-3xl font-extrabold leading-snug text-white sm:text-4xl xl:text-5xl'>
						Binge unlimited Movies,TV Shows and more
					</motion.h2>
					<motion.p
						variants={pvar}
						transition={{
							duration: 0.5,
						}}
						className='my-6 text-sm md:text-lg'>
						Watch Anywhere. Anytime. On any device
					</motion.p>
					<button
						type='button'
						onClick={AllowAccess}
						className='md:text-md rounded-full border-none bg-teal-400 px-6 py-3 text-sm font-extrabold text-gray-900 transition-all delay-[1] ease-in hover:scale-110 hover:text-black hover:shadow-2xl hover:shadow-teal-500 md:px-6 md:py-3'>
						Watch Now
					</button>
				</motion.div>
				<motion.div className='flex h-auto w-full flex-col-reverse items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-neutral-700 py-0 pt-10 md:h-80 md:flex-row md:justify-around md:bg-gradient-to-r md:pt-0'>
					<motion.div className='flex h-44 w-96 flex-col justify-evenly p-4 md:h-auto md:w-[calc(100%-60%)]'>
						<motion.h2
							variants={h2var}
							transition={{
								duration: 0.5,
							}}
							className='mb-6 text-center text-xl font-extrabold md:text-left xl:text-2xl'>
							Watch Anywhere, Anytime
						</motion.h2>
						<motion.p
							variants={pvar}
							transition={{
								duration: 0.5,
							}}
							className='px-4 text-center text-[12px] md:px-0 md:text-left md:text-[14px] lg:text-lg'>
							Our website is optimized for viewing on all your devices. Whether
							you're on your desktop, laptop, tablet, or smartphone, you can
							enjoy the latest movies and trailers on-the-go
						</motion.p>
					</motion.div>
					<motion.div className='h-60 w-80 md:h-auto md:w-auto'>
						<motion.img
							initial={{
								opacity: 0,
								scale: 0.9,
							}}
							whileInView={{
								opacity: 1,
								scale: 1,
							}}
							transition={{
								duration: 0.5,
							}}
							width={400}
							height={350}
							loading='lazy'
							src={movie}
							alt='watching'
							className='mb-4 h-auto w-80 border-[5px] border-black shadow-2xl shadow-black md:mb-0 md:w-[350px] xl:w-[400px]'
						/>
					</motion.div>
				</motion.div>
				<motion.div className='flex h-[calc(100dvh-60dvh)] w-full flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-neutral-700 md:h-[calc(100dvh-70dvh)] md:flex-row md:justify-around md:bg-gradient-to-l'>
					<motion.div className='ml-0 h-24 w-72 md:ml-6 md:h-auto md:w-auto'>
						<motion.img
							initial={{
								opacity: 0,
								translateX: -5,
							}}
							whileInView={{
								opacity: 1,
								translateX: 0,
							}}
							transition={{
								duration: 0.5,
							}}
							width={300}
							height={300}
							loading='lazy'
							src={review}
							alt='watching'
							className='-mt-16 mr-20 h-52 w-[250px] md:-mt-0 md:h-auto xl:w-[300px]'
						/>
					</motion.div>
					<motion.div className='flex h-44 w-96 flex-col justify-evenly p-4 md:h-auto md:w-[calc(100%-60%)]'>
						<motion.h2
							variants={h2var}
							transition={{
								duration: 0.5,
							}}
							className='mb-6 text-center text-xl font-extrabold md:text-left xl:text-2xl'>
							Critic Insights
						</motion.h2>
						<motion.p
							variants={pvar}
							transition={{
								duration: 0.5,
							}}
							className='md:text-md px-4 text-center text-[12px] md:px-0 md:text-left lg:text-lg'>
							Read what critics and moviegoers are saying about the latest
							releases along with
						</motion.p>
					</motion.div>
				</motion.div>
				<motion.div className='flex h-[calc(100dvh-50dvh)] w-full flex-col-reverse items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-neutral-700 md:h-80 md:flex-row md:justify-around md:bg-gradient-to-r'>
					<motion.div className='flex h-44 w-96 flex-col justify-evenly p-4 pb-14 md:h-auto md:w-[calc(100%-60%)]'>
						<motion.h2
							variants={h2var}
							transition={{
								duration: 0.5,
							}}
							className='mb-4 text-center text-xl font-extrabold md:mb-6 md:text-left xl:text-2xl'>
							Latest Releases
						</motion.h2>
						<motion.p
							variants={pvar}
							transition={{
								duration: 0.5,
							}}
							className='md:text-md px-4 text-center text-[12px] md:px-0 md:text-left lg:text-lg'>
							Stay up-to-date with the latest news and gossip from Hollywood and
							beyond.
						</motion.p>
					</motion.div>
					<motion.div className='m-auto my-14 flex h-auto w-auto items-center justify-center md:m-0 md:h-auto md:w-auto'>
						<motion.img
							initial={{
								opacity: 0,
								scale: 0.8,
								rotate: "0deg",
							}}
							whileInView={{
								opacity: 1,
								scale: 1,
								rotate: "-15deg",
							}}
							transition={{
								duration: 0.5,
							}}
							width={176}
							height={256}
							loading='lazy'
							src='https://upload.wikimedia.org/wikipedia/en/1/1c/Transformers-_Rise_of_the_Beasts.jpg'
							alt='watching'
							className='md:w-34 mx-auto -mr-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-auto xl:h-auto xl:w-40'
						/>
						<motion.img
							initial={{
								opacity: 0,
								scale: 0.9,
							}}
							whileInView={{
								opacity: 1,
								scale: 1,
							}}
							transition={{
								duration: 0.5,
							}}
							width={192}
							height={288}
							loading='lazy'
							src='https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg'
							alt='watching'
							className='xl:h-68 md:w-34 z-[2] mx-auto h-56 w-[150px] shadow-2xl shadow-black md:-mt-0 md:h-auto xl:h-auto xl:w-44'
						/>
						<motion.img
							initial={{
								opacity: 0,
								scale: 0.8,
								rotate: "0deg",
							}}
							whileInView={{
								opacity: 1,
								scale: 1,
								rotate: "15deg",
							}}
							transition={{
								duration: 0.5,
							}}
							width={176}
							height={256}
							loading='lazy'
							src='https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg'
							alt='watching'
							className='md:w-34 mx-auto -ml-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-auto xl:h-auto xl:w-40'
						/>
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
}
