import { getMediaData } from "@/api/requests";
import { MovieListGenres } from "@/types/HomeTypes";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

export default function Dropdown({
  setSelected,
  type,
}: {
  setSelected: Dispatch<SetStateAction<number>>;
  type: string;
}) {
  const [genres, setGenres] = useState<MovieListGenres["genres"] | null>(null);
  const memoizedGenres = useRef(null);

  const getShowGenres = useCallback(async () => {
    if (memoizedGenres.current === null) {
      const data = await getMediaData(
        `https://api.themoviedb.org/3/genre/${type}/list?include_adult=false&language=en`,
      );
      memoizedGenres.current = data.genres;
      setGenres(data.genres);
    } else setGenres(memoizedGenres.current);
  }, [type]);

  useEffect(() => {
    getShowGenres();
  }, [getShowGenres]);

  return (
    <select
      name="Sort by Genre"
      onChange={(e) => setSelected(Number(e.target.value))}
      aria-label="Sort by genre"
      className="content-dropdown"
    >
      {genres?.map((genre) => (
        <option
          key={genre.id}
          value={genre.id}
          className="content-dropdown-option"
        >
          {genre.name}
        </option>
      ))}
    </select>
  );
}
