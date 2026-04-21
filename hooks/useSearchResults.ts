import { getMediaData } from "@/api/requests";
import { MultiSearch } from "@/types/Search";
import { useEffect, useState } from "react";

export default function useSearchResults(query: string) {
  const [searchResults, setSearchResults] = useState<MultiSearch | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const data = await getMediaData(
          `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`,
        );
        const min: MultiSearch = data.results.filter(
          (res: { media_type: string }) => res.media_type !== "person",
        );
        setSearchResults(min.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    }, 800);
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  return searchResults;
}
