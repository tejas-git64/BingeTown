export default function MovieShowFallback() {
  const items = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(154px, 1fr))",
        gridTemplateRows: "repeat(auto-fill, minmax(300px, 1fr))",
      }}
      className="content-container mt-24"
    >
      {items.map((_, i) => (
        <div key={i} className="title-container">
          <div className="mb-2 h-[231px] w-[154px] flex-shrink-0 cursor-pointer rounded-lg bg-neutral-600"></div>
          <div className="h-3 w-full rounded-md bg-neutral-700"></div>
          <div className="my-1 h-[10.5px] w-20 rounded-md bg-neutral-700 font-semibold"></div>
          <div className="h-[10.5px] w-12 rounded-md bg-neutral-700" />
        </div>
      ))}
    </div>
  );
}
