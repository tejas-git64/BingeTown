import { auth } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import movie from "@/public/images/stranger things.jpg";
import review from "@/public//svgs/ratings.svg";
import { redirect } from "next/navigation";
import Link from "next/link";

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
      <div className="h-full w-full flex-shrink-0 overflow-hidden scroll-smooth">
        <div className="3xl:h-[1215px] relative mx-auto h-[500px] w-full sm:h-[600px] lg:h-[750px]">
          <picture>
            <source
              media="(max-width: 480px)"
              width={420}
              height={720}
              srcSet="/landing/landing-default-480px.webp"
              className="h-[720px] w-full object-cover"
            />
            <source
              media="(max-width: 640px)"
              srcSet="/landing/landing-default-640px.webp"
              className="h-full w-full object-cover"
            />
            <source
              media="(max-width: 768px)"
              srcSet="/landing/landing-default-768px.webp"
              className="h-full w-full object-cover"
            />
            <source
              media="(max-width: 1024px)"
              srcSet="/landing/landing-default-1024px.webp"
              className="h-full w-full object-cover"
            />
            <source
              media="(max-width: 1536px)"
              srcSet="/landing/landing-default-1536px.webp"
              className="h-full w-full object-cover"
            />
            <img
              src={"/landing/landing-default-2160px.webp"}
              width={2160}
              height={1215}
              alt="landing-img"
              fetchPriority="high"
              loading="eager"
              sizes="(max-width: 2160px)"
              className="full absolute left-0 top-0 -z-[1] h-full w-full flex-shrink-0 bg-transparent object-cover"
            />
          </picture>
          <div className="z-0 flex h-full w-full flex-col items-center justify-center bg-gradient-to-t from-black to-transparent px-10 text-center md:px-0">
            <h2 className="text-2xl font-extrabold leading-snug text-white sm:text-3xl xl:text-4xl">
              Binge unlimited Movies,TV Shows and more
            </h2>
            <p className="my-6 text-xs font-bold text-teal-300 sm:text-sm md:text-lg">
              Watch Anywhere. Anytime. On any device
            </p>
            <Link
              href={"/home"}
              className="md:text-md an rounded-full border-none bg-teal-400 px-4 py-2 text-xs font-bold text-gray-900 antialiased transition ease-in hover:scale-110 hover:shadow-2xl hover:shadow-teal-500 md:px-6 md:py-2.5 md:text-sm"
            >
              Watch Now
            </Link>
          </div>
        </div>
        <div className="flex h-auto w-full flex-col-reverse items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-neutral-700 py-0 pt-10 md:h-80 md:flex-row md:justify-around md:bg-gradient-to-r md:pt-0">
          <div className="flex h-44 w-96 flex-col justify-evenly p-4 md:h-auto md:w-[calc(100%-60%)]">
            <h2 className="mb-6 text-center text-xl font-extrabold text-white md:text-left xl:text-2xl">
              Watch Anywhere, Anytime
            </h2>
            <p className="px-4 text-center text-[12px] text-white md:px-0 md:text-left md:text-[14px] lg:text-[16px]">
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
              alt="movie"
              className="mb-4 h-auto w-80 border-[5px] border-black shadow-2xl shadow-black transition-transform duration-500 md:mb-0 md:w-[350px] xl:w-[400px]"
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-neutral-700 pt-10 md:h-80 md:flex-row md:justify-around md:bg-gradient-to-l md:pt-0">
          <div className="ml-0 h-24 w-72 md:ml-6 md:h-auto md:w-auto">
            <Image
              width={256}
              height={256}
              loading="lazy"
              src={review}
              alt="ratings"
              className="mx-auto -mt-10 h-[200px] w-[200px] transition-transform duration-500 before:-translate-x-5 after:translate-x-0 md:-mt-0 md:mr-20 md:h-auto md:w-[250px] xl:w-[300px]"
            />
          </div>
          <div className="flex h-44 w-96 flex-col justify-evenly p-4 md:h-auto md:w-[calc(100%-60%)] xl:ml-20">
            <h2 className="text-center text-xl font-extrabold text-white md:mb-6 md:text-left xl:text-2xl">
              Critic Insights
            </h2>
            <p className="md:text-md px-4 text-center text-[12px] text-white md:px-0 md:text-left lg:text-[16px]">
              Read what critics and moviegoers are saying about the latest
              releases along with
            </p>
          </div>
        </div>
        <div className="-mt-1 flex h-[calc(100dvh-50dvh)] w-full flex-col-reverse items-center justify-center bg-gradient-to-t from-black via-neutral-900 to-neutral-700 md:h-80 md:flex-row md:justify-around md:bg-gradient-to-r">
          <div className="flex h-44 w-96 flex-col justify-evenly p-4 pb-10 md:h-auto md:w-[calc(100%-60%)]">
            <h2 className="mb-4 text-center text-xl font-extrabold text-white md:mb-6 md:text-left xl:text-2xl">
              Latest Releases
            </h2>
            <p className="md:text-md px-4 text-center text-[12px] text-white md:px-0 md:text-left lg:text-[16px]">
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
              alt="movie"
              draggable={false}
              className="md:w-34 mx-auto -ml-10 h-[194.48px] w-[130px] rotate-[15deg] shadow-2xl shadow-black brightness-75 transition ease-in hover:brightness-100 md:-mt-0 md:h-auto xl:w-40"
            />
            <Image
              width={256}
              height={381}
              loading="lazy"
              src="https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg"
              alt="movie"
              draggable={false}
              className="md:w-34 mx-auto -ml-10 h-[193.44px] w-[130px] rotate-[15deg] shadow-2xl shadow-black brightness-75 transition ease-in hover:brightness-100 md:-mt-0 md:h-auto xl:w-40"
            />
            <Image
              width={220}
              height={348}
              loading="lazy"
              src="https://upload.wikimedia.org/wikipedia/en/f/f2/Fast_X_poster.jpg"
              alt="movie"
              draggable={false}
              className="md:w-34 mx-auto -ml-10 h-[205.53px] w-[130px] rotate-[15deg] shadow-2xl shadow-black brightness-75 transition ease-in hover:brightness-100 md:-mt-0 md:h-auto xl:w-40"
            />
          </div>
        </div>
      </div>
    </>
  );
}
