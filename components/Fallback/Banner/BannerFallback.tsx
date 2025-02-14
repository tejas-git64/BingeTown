export default function BannerFallback() {
  return (
    <div className="mx-auto flex h-[60vw] w-full snap-x snap-mandatory overflow-y-hidden overflow-x-scroll sm:h-[360px] sm:px-[10px] md:h-[450px] xl:h-[650px] xl:px-[45px] 2xl:pl-72">
      <div className="mr-2 flex aspect-video h-[60vw] w-full flex-shrink-0 snap-center rounded-2xl bg-neutral-700 transition sm:h-[350px] md:h-[440px] md:w-[780px] xl:h-[640px] xl:w-[1280px]"></div>
      <div className="mr-2 flex aspect-video h-[60vw] w-full flex-shrink-0 snap-center rounded-2xl bg-neutral-700 transition sm:h-[350px] md:h-[440px] md:w-[780px] xl:h-[640px] xl:w-[1280px]"></div>
      <div className="mr-2 flex aspect-video h-[60vw] w-full flex-shrink-0 snap-center rounded-2xl bg-neutral-700 transition sm:h-[350px] md:h-[440px] md:w-[780px] xl:h-[640px] xl:w-[1280px]"></div>
    </div>
  );
}
