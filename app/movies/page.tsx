"use client";

import { Suspense, useState } from "react";
import MoviesContainer from "@/components/MoviesContainer/MoviesContainer";
import Dropdown from "@/components/Dropdown/Dropdown";
import MovieShowFallback from "./loading";

export default function Movies() {
  const [selected, setSelected] = useState<number>(28);

  return (
    <div className="content-root">
      <div className="content-parent">
        <h3 className="content-heading">Movies</h3>
        <Dropdown setSelected={setSelected} type={"movie"} />
      </div>
      <Suspense fallback={<MovieShowFallback />}>
        <MoviesContainer selection={selected} />
      </Suspense>
    </div>
  );
}
