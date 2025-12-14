"use client";

import { Suspense, useState } from "react";
import ShowsContainer from "@/components/ShowsContainer/ShowsContainer";
import Dropdown from "@/components/Dropdown/Dropdown";
import MovieShowFallback from "../movies/loading";

export default function TVShows() {
  const [selected, setSelected] = useState<number>(10759);

  return (
    <div className="content-root">
      <div className="content-parent">
        <h3 className="content-heading">TV Shows</h3>
        <Dropdown setSelected={setSelected} type={"tv"} />
      </div>
      <Suspense fallback={<MovieShowFallback />}>
        <ShowsContainer selection={selected} />
      </Suspense>
    </div>
  );
}
