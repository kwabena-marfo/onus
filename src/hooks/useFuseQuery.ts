/* eslint-disable @typescript-eslint/no-explicit-any */
import Fuse from "fuse.js";
import { useCallback } from "react";

const optionsList = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: true,
  findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.0,
  distance: 100,
  useExtendedSearch: true,
  ignoreLocation: true,
  ignoreFieldNorm: false,
};

export default function useQueryOnus(verses: any) {
  const options = {
    ...optionsList,
    keys: ["book"],
  };

  const queryOnus = useCallback(
    (searchQuery: any) => {
      const fuse = new Fuse(verses, options);
      return fuse.search(searchQuery);
    },
    [verses]
  );

  return queryOnus;
}
