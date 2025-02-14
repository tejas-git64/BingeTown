export default function DetailsPageFallback() {
  const arr = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
  return (
    <>
      <div className="mt-14 flex h-auto min-h-[60dvh] flex-col overflow-hidden bg-neutral-900 px-4 pb-10 pt-3 md:mb-0 md:h-auto md:justify-around md:px-0 md:pb-8 lg:flex-row lg:justify-around lg:px-0 xl:w-full xl:justify-evenly xl:px-2">
        <div className="hidden h-64 w-full overflow-hidden lg:block lg:h-[1015px] lg:min-w-[380px] lg:max-w-[28vw] lg:pl-4 xl:h-[800px] xl:w-[400px] xl:pr-4 2xl:h-[50vw]">
          <p className="my-2 text-left text-sm text-white">Recommendations</p>
          <ul className="h-full w-full overflow-x-hidden overflow-y-scroll rounded-md pb-10 pr-1">
            {Array(15)
              .fill("")
              ?.map((_, i) => (
                <div
                  key={i}
                  className="mb-1 flex h-auto w-full items-center justify-start rounded-md bg-neutral-800 hover:bg-neutral-700"
                >
                  <div className="mr-4 h-[52px] w-[92px] animate-pulse rounded-md bg-neutral-500"></div>
                  <div className="flex h-12 w-56 flex-col items-start justify-center bg-neutral-800">
                    <div className="mb-2 h-3 w-56 rounded-sm bg-neutral-500 text-[12px]"></div>
                    <div className="h-3 w-20 rounded-sm bg-neutral-600"></div>
                  </div>
                </div>
              ))}
          </ul>
        </div>
        <div className="flex h-full w-full flex-col items-start justify-center overflow-hidden rounded-md lg:w-[64.5%] xl:w-full xl:flex-row">
          <div className="3xl:w-full mb-2 flex h-auto w-full flex-col md:min-w-[30vw] md:px-2 xl:w-[50vw] xl:px-0 2xl:w-[60vw] 2xl:max-w-[90vw] 2xl:pr-4">
            <div className="my-1.5 h-4 w-full rounded-md bg-neutral-600 md:h-6 md:w-[50%]"></div>
            <div className="mx-auto aspect-video h-[55vw] w-full rounded-xl bg-neutral-600 md:h-[60vw] lg:h-[35vw] xl:h-[27.5vw] xl:max-h-[70vw] xl:w-full 2xl:h-[35vw] 2xl:max-h-[1200px] 2xl:w-full"></div>
            <div className="mx-auto h-auto w-full">
              <div
                id="videos"
                className="flex h-28 w-full items-center justify-start overflow-x-scroll"
              >
                {Array(6)
                  .fill("")
                  .map((_, i) => (
                    <div key={i} className="mr-3 h-auto w-auto animate-pulse">
                      <div className="h-[85px] w-[120px] rounded-lg bg-neutral-600"></div>
                    </div>
                  ))}
              </div>
              <ul
                id="genres"
                className="text mx-auto my-2 flex w-full items-center xl:w-full"
              >
                <p className="mr-2 pb-[3px] pl-0 text-xs font-semibold text-neutral-400 antialiased md:text-sm">
                  Genres:{" "}
                </p>
                <ul id="genres" className="flex overflow-x-scroll">
                  <div className="mr-1 h-[10px] w-20 whitespace-nowrap rounded-full bg-neutral-500 pr-1 font-semibold md:h-[14px] md:pr-2"></div>
                  <div className="mr-1 h-[10px] w-20 whitespace-nowrap rounded-full bg-neutral-500 pr-1 font-semibold md:h-[14px] md:pr-2"></div>
                  <div className="mr-1 h-[10px] w-20 whitespace-nowrap rounded-full bg-neutral-500 pr-1 font-semibold md:h-[14px] md:pr-2"></div>
                  <div className="mr-1 h-[10px] w-20 whitespace-nowrap rounded-full bg-neutral-500 pr-1 font-semibold md:h-[14px] md:pr-2"></div>
                </ul>
              </ul>
              <div className="mx-auto -mt-1 mb-2 w-full text-left text-white xl:w-full">
                <p className="mr-2 whitespace-nowrap text-left text-xs font-semibold text-neutral-400 antialiased md:text-sm">
                  Release year:
                </p>
                <h3 className="mt-2.5 w-full text-justify text-xs font-semibold text-white antialiased md:text-sm">
                  Summary
                </h3>
                <div className="mt-1.5 flex h-auto w-full flex-col items-start justify-start space-y-2">
                  <p className="h-1.5 w-full rounded-md bg-neutral-400"></p>
                  <p className="h-1.5 w-full rounded-md bg-neutral-500"></p>
                  <p className="h-1.5 w-full rounded-md bg-neutral-600"></p>
                  <p className="h-1.5 w-full rounded-md bg-neutral-700"></p>
                  <p className="h-1.5 w-full rounded-md bg-neutral-700"></p>
                </div>
              </div>
            </div>
            <h4 className="mb-2 text-left text-xs font-bold text-white md:text-sm">
              Cast members
            </h4>
            <ul id="cast" className="mb-2 flex h-auto w-full">
              {arr.map(() => (
                <div
                  key={Math.random()}
                  className="mr-5 flex h-full w-24 flex-shrink-0 flex-col items-center justify-start md:w-28"
                >
                  <p className="h-34 mb-1 w-24 rounded-2xl md:h-auto md:w-[200px]"></p>
                  <p className="text-xs font-semibold"></p>
                  <h4 className="text-xs font-normal text-yellow-300"></h4>
                </div>
              ))}
            </ul>
            <div className="h-auto w-full">
              <div className="my-2 flex w-full items-center justify-between">
                <p className="text-left text-sm text-white">Reviews</p>
                <p className="bg-transparent p-2 py-1 text-sm text-gray-400">
                  Hide comments
                </p>
              </div>
            </div>
          </div>
          <div className="mx-auto h-72 w-full flex-shrink-0 pb-9 md:h-80 md:px-2 lg:px-4 lg:pl-2 xl:ml-2 xl:mt-1.5 xl:block xl:h-[800px] xl:max-w-[340px] xl:px-2 2xl:h-[50vw]">
            <p className="text-left text-sm font-semibold text-white xl:pl-5">
              Similar Titles
            </p>
            <ul
              id="similar"
              className="mt-2 flex h-auto place-items-end xl:grid xl:h-full xl:overflow-hidden xl:overflow-y-scroll xl:pt-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
                gridTemplateRows: "repeat(auto-fill, minmax(260px, 1fr))",
                rowGap: "15px",
                columnGap: "10px",
              }}
            >
              {arr.map(() => (
                <div
                  key={Math.random()}
                  className="h-auto w-[154px] flex-shrink-0 animate-pulse"
                >
                  <div className="h-[231px] w-[154px] rounded-xl bg-neutral-600 transition-all ease-in hover:scale-95"></div>
                  <div className="mt-1 flex h-8 w-full flex-col items-start justify-start space-y-1">
                    <div className="h-3 w-full overflow-x-hidden rounded-md bg-neutral-700 text-left text-xs"></div>
                    <div className="h-3 w-12 rounded-md bg-neutral-700 text-xs font-semibold"></div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
