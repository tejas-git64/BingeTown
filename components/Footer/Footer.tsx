import twit from "@/public/svgs/icons8-twitterx.svg";
import linkedin from "@/public/svgs/linkedin-svgrepo-com.svg";
import github from "@/public/svgs/github-svgrepo-com.svg";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex h-auto w-full flex-col bg-black p-4 md:space-y-6">
      <div className="flex w-full flex-col items-center justify-center py-6 pt-10 md:mx-auto md:h-28 md:w-[80%] md:flex-row md:items-end md:pt-0 lg:w-[800px] xl:w-[600px]">
        <h2 className="text-md -mt-1 whitespace-nowrap py-10 font-semibold text-neutral-200 md:my-0 md:mb-0 md:mr-10 lg:mr-20">
          Reach us here
        </h2>
        <div className="flex h-auto w-[80%] flex-row justify-around md:flex-col md:items-start md:justify-around md:space-y-6">
          <div className="flex h-auto w-[30%] flex-col items-start justify-start leading-loose md:w-auto md:flex-row md:items-center">
            <h3 className="mb-4 mr-6 text-sm font-semibold text-teal-500 md:mb-0">
              More
            </h3>
            <div className="flex w-auto flex-col items-start justify-start space-y-2 md:w-[400px] md:flex-row md:space-x-6 md:space-y-0">
              <a
                href="#"
                className="md:text-md text-sm font-semibold text-gray-400 hover:text-teal-400"
              >
                Movies
              </a>
              <a
                href="#"
                className="md:text-md text-sm font-semibold text-gray-400 hover:text-teal-400"
              >
                Popular
              </a>
              <a
                href="#"
                className="md:text-md text-sm font-semibold text-gray-400 hover:text-teal-400"
              >
                TV Shows
              </a>
              <a
                href="#"
                className="md:text-md text-sm font-semibold text-gray-400 hover:text-teal-400"
              >
                Originals
              </a>
            </div>
          </div>
          <div className="flex h-auto w-[30%] flex-col items-start justify-start leading-loose md:w-auto md:flex-row md:items-center">
            <h3 className="mb-4 mr-6 text-sm font-semibold text-teal-500 md:mb-0">
              Help
            </h3>
            <div className="flex w-auto flex-col items-start justify-start space-y-2 md:w-[400px] md:flex-row md:space-x-6 md:space-y-0">
              <a
                href="#"
                className="md:text-md whitespace-nowrap text-left text-sm font-semibold text-gray-400 hover:text-teal-400"
              >
                Account Support
              </a>
              <a
                href="#"
                className="md:text-md whitespace-nowrap text-left text-sm font-semibold text-gray-400 hover:text-teal-400"
              >
                Supported Devices
              </a>
              <a
                href="#"
                className="md:text-md text-sm font-semibold text-gray-400 hover:text-teal-400"
              >
                Accessibility
              </a>
              <a
                href="#"
                className="md:text-md whitespace-nowrap text-sm font-semibold text-gray-400 hover:text-teal-400"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex h-auto w-full flex-col items-center justify-center py-16 md:w-[80%] md:flex-row md:py-0 lg:w-[800px] xl:mx-auto xl:w-[660px]">
        <h4 className="text-md font-semibold text-neutral-200 md:-mr-16 md:whitespace-nowrap lg:-mr-44 xl:-mr-6 xl:ml-1">
          Look me up here
        </h4>
        <div className="mx-auto flex w-full items-center justify-center md:w-[400px] md:justify-start">
          <a href="https://twitter.com/yousurebro_tej">
            <Image
              src={twit}
              alt="twitter"
              width={10}
              height={10}
              className="h-10 w-10 p-2"
            />
          </a>
          <a href="https://www.linkedin.com/in/tejas-dl-94b771185">
            <Image
              src={linkedin}
              alt="linkedin"
              width={11}
              height={11}
              className="h-11 w-11 p-2"
            />
          </a>
          <a href="https://github.com/tejas-git64">
            <Image
              src={github}
              alt="github"
              width={6}
              height={6}
              className="ml-2 h-6 w-6"
            />
          </a>
        </div>
      </div>
      <div className="flex h-10 w-full flex-col items-center justify-center px-6 md:h-4 md:flex-row-reverse md:items-end md:justify-start">
        <h4 className="my-3 text-sm font-bold text-neutral-400 md:my-0 md:text-xl">
          BingeTown {new Date().getFullYear()}
        </h4>
        <p className="pb-1 text-sm font-medium text-neutral-400 md:mr-10">
          Made with 💖 by{" "}
          <a
            href="https://github.com/tejas-git64"
            className="font-semibold text-fuchsia-400"
          >
            Tej
          </a>
        </p>
      </div>
    </footer>
  );
}
