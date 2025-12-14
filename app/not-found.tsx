import Link from "next/link";
import { auth } from "../firebase/Firebase";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="relative flex h-[95dvh] max-h-[1000px] w-full flex-col items-center justify-center bg-neutral-800">
      <Image
        src={
          "https://i.pinimg.com/originals/c5/dc/40/c5dc403178d1afa38b1ea167333b8c2d.jpg"
        }
        alt="not-found-page"
        width={2560}
        height={1440}
        fetchPriority="high"
        priority
        loading="eager"
        className="absolute left-0 top-0 z-0 h-full w-full object-cover"
      />
      <div className="z-10 bg-transparent text-center">
        <h1 className="mb-10 text-9xl font-extrabold text-neutral-800">404</h1>
        <h2 className="text-3xl font-extrabold text-neutral-300">
          Page not found
        </h2>
        <h3 className="mb-10 mt-5 text-base font-bold text-neutral-500">
          Oops! you opened a non existing page 😬
        </h3>
        <Link
          href={auth.currentUser ? `/home` : `/`}
          className="rounded-md bg-white px-4 py-1.5 font-extrabold text-neutral-900 shadow-2xl transition-all duration-[3] ease-in-out"
        >
          Go back!
        </Link>
      </div>
    </div>
  );
}
