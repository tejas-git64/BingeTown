import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import bgImg from "@/public/landing/landing-default-2160px.webp";
import movie from "@/public/images/stranger things.jpg";
import review from "@/public//svgs/ratings.svg";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BingeTown",
  description: "Watch Movies, TV Shows and more in one place",
};

export default function Landing() {
  function allowAccess() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        redirect("/home");
      }
    });
  }
  allowAccess();

  return (
    <>
      <div className="w-full">
        <div className="3xl:h-[1215px] relative mx-auto h-[550px] w-full lg:h-[750px]">
          <Image
            src={bgImg}
            width={2160}
            height={1215}
            alt="landing-img"
            fetchPriority="high"
            loading="eager"
            // sizes="(max-width: 2160px)"
            placeholder="blur"
            className="full absolute left-0 top-0 -z-[1] h-full w-full bg-transparent object-cover"
          />
          <div className="z-0 flex h-full w-full flex-col items-center justify-center bg-gradient-to-t from-black to-transparent px-10 text-center md:px-0">
            <h2 className="text-3xl font-extrabold leading-snug text-white sm:text-4xl xl:text-5xl">
              Binge unlimited Movies,TV Shows and more
            </h2>
            <p className="my-6 text-sm font-bold text-teal-300 md:text-lg">
              Watch Anywhere. Anytime. On any device
            </p>
            <Link
              href={"/home"}
              className="md:text-md an rounded-full border-none bg-teal-400 px-4 py-1.5 text-xs font-bold text-gray-900 antialiased transition ease-in hover:scale-110 hover:shadow-2xl hover:shadow-teal-500 md:px-6 md:py-2.5 md:text-sm"
            >
              Watch Now
            </Link>
          </div>
        </div>
        <div className="flex h-auto w-full flex-col-reverse items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-neutral-700 py-0 pt-10 md:h-80 md:flex-row md:justify-around md:bg-gradient-to-r md:pt-0">
          <div className="flex h-44 w-96 flex-col justify-evenly p-4 md:h-auto md:w-[calc(100%-60%)]">
            <h2 className="mb-6 text-center text-xl font-extrabold md:text-left xl:text-2xl">
              Watch Anywhere, Anytime
            </h2>
            <p className="px-4 text-center text-[12px] md:px-0 md:text-left md:text-[14px] lg:text-lg">
              Our website is optimized for viewing on all your devices. Whether
              you&apos;re on your desktop, laptop, tablet, or smartphone, you
              can enjoy the latest movies and trailers on-the-go
            </p>
          </div>
          <div className="h-60 w-80 md:h-auto md:w-auto">
            <Image
              width={400}
              height={350}
              loading="lazy"
              src={movie}
              alt="watching"
              className="mb-4 h-auto w-80 border-[5px] border-black shadow-2xl shadow-black transition-transform duration-500 before:scale-90 after:scale-100 md:mb-0 md:w-[350px] xl:w-[400px]"
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-neutral-700 pt-10 md:h-80 md:flex-row md:justify-around md:bg-gradient-to-l md:pt-0">
          <div className="ml-0 h-24 w-72 md:ml-6 md:h-auto md:w-auto">
            <Image
              width={400}
              height={350}
              loading="lazy"
              src={review}
              alt="watching"
              className="mx-auto -mt-10 h-52 w-[200px] transition-transform duration-500 before:-translate-x-5 after:translate-x-0 md:-mt-0 md:mr-20 md:h-auto md:w-[250px] xl:w-[400px]"
            />
          </div>
          <div className="flex h-44 w-96 flex-col justify-evenly p-4 md:h-auto md:w-[calc(100%-60%)]">
            <h2 className="text-center text-xl font-extrabold md:mb-6 md:text-left xl:text-2xl">
              Critic Insights
            </h2>
            <p className="md:text-md px-4 text-center text-[12px] md:px-0 md:text-left lg:text-lg">
              Read what critics and moviegoers are saying about the latest
              releases along with
            </p>
          </div>
        </div>
        <div className="-mt-1 flex h-[calc(100dvh-50dvh)] w-full flex-col-reverse items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-neutral-700 md:h-80 md:flex-row md:justify-around md:bg-gradient-to-r">
          <div className="flex h-44 w-96 flex-col justify-evenly p-4 md:h-auto md:w-[calc(100%-60%)]">
            <h2 className="mb-4 text-center text-xl font-extrabold md:mb-6 md:text-left xl:text-2xl">
              Latest Releases
            </h2>
            <p className="md:text-md px-4 text-center text-[12px] md:px-0 md:text-left lg:text-lg">
              Stay up-to-date with the latest news and gossip from Hollywood and
              beyond.
            </p>
          </div>
          <div className="my-14 ml-10 flex h-auto w-auto items-center justify-center md:m-0 md:ml-0 md:h-auto md:w-auto">
            <Image
              width={256}
              height={384}
              loading="lazy"
              src="https://upload.wikimedia.org/wikipedia/en/1/1c/Transformers-_Rise_of_the_Beasts.jpg"
              alt="watching"
              className="md:w-34 mx-auto -ml-10 h-48 w-[130px] rotate-[15deg] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-auto xl:h-auto xl:w-40"
            />
            <Image
              width={192}
              height={256}
              loading="lazy"
              src="https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg"
              alt="watching"
              className="md:w-34 mx-auto -ml-10 h-48 w-[130px] rotate-[15deg] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-auto xl:h-auto xl:w-40"
            />
            <Image
              width={192}
              height={256}
              loading="lazy"
              src="https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg"
              alt="watching"
              className="md:w-34 mx-auto -ml-10 h-48 w-[130px] rotate-[15deg] shadow-2xl shadow-black brightness-75 md:-mt-0 md:h-auto xl:h-auto xl:w-40"
            />
          </div>
        </div>
      </div>
    </>
  );
}
