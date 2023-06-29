import movie from "../../assets/images/stranger things.jpg";
import review from "../../assets/svgs/ratings.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/Firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Landing() {
	const navigate = useNavigate();

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

	const h2var = {
		initial: {
			translateX: -20,
			opacity: 0,
		},
		animate: {
			translateX: 0,
			opacity: 1,
		},
		exit: {
			translateY: 30,
			opacity: 0,
		},
	};

	const pvar = {
		initial: {
			translateY: 20,
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
				className='h-auto w-full font-jakartaSans'>
				<motion.div
					style={{
						backgroundImage:
							"linear-gradient(180deg, #000, #0005) , url(https://wallpaperaccess.com/full/5004467.jpg)",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						backgroundAttachment: "fixed",
					}}
					className='flex h-[700px] w-full flex-col items-center justify-center bg-cover px-10 pt-10 ease-in-out md:h-[800px]'>
					<motion.h2
						variants={h2var}
						transition={{
							duration: 1,
						}}
						className='text-4xl font-extrabold leading-snug text-white md:text-5xl'>
						Binge unlimited Movies,TV Shows and more
					</motion.h2>
					<motion.p
						variants={pvar}
						transition={{
							duration: 1,
						}}
						className='my-12'>
						Watch Anywhere. Anytime. On any device
					</motion.p>
					<button
						onClick={AllowAccess}
						className='rounded-full border-none bg-teal-400 px-8 py-3 text-sm font-extrabold text-gray-900 transition-all delay-[1] ease-in hover:scale-110 hover:text-black hover:shadow-2xl hover:shadow-teal-500 md:px-10 md:py-3 md:text-lg'>
						Watch Now
					</button>
				</motion.div>
				<motion.div className='flex h-auto w-full flex-col-reverse items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-neutral-700 py-12 md:h-[calc(100dvh-50dvh)] md:flex-row md:justify-around md:bg-gradient-to-r md:py-4'>
					<motion.div className='flex h-44 w-96 flex-col justify-evenly p-4 md:h-96 md:w-[calc(100%-60%)]'>
						<motion.h2
							variants={h2var}
							transition={{
								duration: 2,
							}}
							className='mb-6 text-center text-2xl font-extrabold md:mb-0 md:text-left xl:text-4xl'>
							Watch Anywhere, Anytime
						</motion.h2>
						<motion.p
							variants={pvar}
							transition={{
								duration: 1,
							}}
							className='px-4 text-justify text-sm md:px-0 md:text-left md:text-lg lg:text-2xl'>
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
								duration: 1,
							}}
							src={movie}
							alt='watching'
							className='mb-4 h-auto w-80 border-[5px] border-black shadow-2xl shadow-black md:mb-0 md:w-[350px] xl:w-[450px]'
						/>
					</motion.div>
				</motion.div>
				<motion.div className='flex h-[calc(100dvh-60dvh)] w-full flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-neutral-700 py-4 md:h-[calc(100dvh-60dvh)] md:flex-row md:justify-around md:bg-gradient-to-l'>
					<motion.div className='ml-0 h-24 w-72 md:ml-6 md:h-auto md:w-auto'>
						<motion.img
							initial={{
								opacity: 0,
								translateX: -20,
							}}
							whileInView={{
								opacity: 1,
								translateX: 0,
							}}
							transition={{
								duration: 1,
							}}
							src={review}
							alt='watching'
							className='-mt-16 h-52 w-72 md:-mt-0 md:h-auto md:w-[300px] xl:w-[350px]'
						/>
					</motion.div>
					<motion.div className='flex h-44 w-96 flex-col justify-evenly p-4 md:h-96 md:w-[calc(100%-60%)]'>
						<motion.h2
							variants={h2var}
							transition={{
								duration: 2,
							}}
							className='mb-4 text-center text-2xl font-extrabold md:mb-0 md:text-left xl:text-4xl'>
							Critic Insights
						</motion.h2>
						<motion.p
							variants={pvar}
							transition={{
								duration: 1,
							}}
							className='px-4 text-center text-sm md:px-0 md:text-left md:text-lg lg:text-2xl'>
							Read what critics and moviegoers are saying about the latest
							releases along with
						</motion.p>
					</motion.div>
				</motion.div>
				<motion.div className='flex h-[calc(100dvh-50dvh)] w-full flex-col-reverse items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-neutral-700 py-4 md:h-[calc(100dvh-55dvh)] md:flex-row md:justify-around md:bg-gradient-to-r'>
					<motion.div className='flex h-44 w-96 flex-col justify-evenly p-4 pb-14 md:h-96 md:w-[calc(100%-60%)]'>
						<motion.h2
							variants={h2var}
							transition={{
								duration: 2,
							}}
							className='mb-4 text-center text-2xl font-extrabold md:mb-0 md:text-left xl:text-4xl'>
							Latest Releases
						</motion.h2>
						<motion.p
							variants={pvar}
							transition={{
								duration: 1,
							}}
							className='px-4 text-center text-sm md:px-0 md:text-left md:text-lg lg:text-2xl'>
							Stay up-to-date with the latest news and gossip from Hollywood and
							beyond.
						</motion.p>
					</motion.div>
					<motion.div className='m-auto my-14 flex h-auto w-auto items-center justify-center md:m-0 md:ml-6 md:h-auto md:w-auto'>
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
								duration: 1,
							}}
							src='https://upload.wikimedia.org/wikipedia/en/1/1c/Transformers-_Rise_of_the_Beasts.jpg'
							alt='watching'
							className='mx-auto -mr-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-56 md:w-40 xl:h-64 xl:w-44'
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
								duration: 1,
							}}
							src='https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg'
							alt='watching'
							className='xl:h-68 z-[2] mx-auto h-56 w-[150px] shadow-2xl shadow-black md:-mt-0 md:h-64 md:w-44 xl:h-72 xl:w-48'
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
								duration: 1,
							}}
							src='https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg'
							alt='watching'
							className='mx-auto -ml-10 h-48 w-[130px] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-56 md:w-40 xl:h-64 xl:w-44'
						/>
					</motion.div>
				</motion.div>
			</motion.div>
		</>
	);
}
