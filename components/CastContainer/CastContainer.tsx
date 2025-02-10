import { CastTotal } from "@/app/movies/[id]/TitleTypes";
import React from "react";
import { CastMember } from "../CastMember/CastMember";

export default function CastContainer({ movieCast }: { movieCast: CastTotal }) {
  return (
    <>
      <h4 className="mb-2 text-left text-xs font-bold text-white md:text-sm">
        Cast members
      </h4>
      <ul id="cast" className="mb-2 flex h-auto w-full overflow-x-scroll">
        {movieCast.cast?.map((member) => (
          <div key={member.id}>
            <CastMember {...member} order={0} />
          </div>
        ))}
      </ul>
    </>
  );
}
