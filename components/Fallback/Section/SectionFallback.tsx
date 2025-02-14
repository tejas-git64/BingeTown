export default function SectionFallback() {
  return (
    <div className="mx-auto h-auto w-full">
      <div className="mx-auto w-72 bg-neutral-600"></div>
      <div
        id="latest"
        className="mx-auto flex h-[300px] animate-pulse items-center justify-start overflow-y-hidden overflow-x-scroll md:h-auto"
      >
        {Array(10)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="mx-auto mr-2 flex h-72 w-[154px] flex-shrink-0 flex-col items-start justify-start overflow-hidden md:mx-0 md:mr-4 md:h-[300px] md:w-[154px]"
            >
              <div className="h-[231px] w-[154px] rounded-lg bg-neutral-600"></div>
              <div className="mt-3 h-2.5 w-full rounded-md bg-neutral-700"></div>
              <div className="mb-2 mt-1.5 h-[9px] w-12 rounded-md bg-neutral-700"></div>
              <h3 className="h-[9px] w-6 rounded-md bg-neutral-700"></h3>
            </div>
          ))}
      </div>
    </div>
  );
}
