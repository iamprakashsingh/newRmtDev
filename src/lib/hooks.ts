import { useState, useEffect } from "react";
import { BASE_API_URL } from "./constants";
import { JobItem, JobItemData } from "./types";
import { useActiveIdStore } from "../stores/activeIdStore";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSearchTextStore } from "../stores/searchTextStore";
import { handleError } from "./utils";
import { useBookmarksStore } from "../stores/BookmarksStore";

type JobItemDataApiResponse = {
  public: boolean;
  jobItem: JobItemData;
};

const fetchJobItemData = async (
  id: number | null
): Promise<JobItemDataApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.description);
  }
  return data;
};

export function useJobItemData(id: number | null) {
  const { data, isLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItemData(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: id != null,
      onError: (error) => handleError(error),
    }
  );
  const jobItemData = data?.jobItem;
  return { jobItemData, isLoading };
}

export function useActiveJobItemData() {
  const activeId = useActiveIdStore((state) => state.activeId);
  return useJobItemData(activeId);
}

//-----------------------------------------------------

type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};

const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.description);
  }
  return data;
};

export function useSearchedJobItems() {
  const searchText = useDebounce(
    useSearchTextStore((state) => state.searchText)
  );
  const { data, isInitialLoading } = useQuery(
    ["job-items", searchText],
    () => fetchJobItems(searchText),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: searchText != "",
      onError: (error) => handleError(error),
    }
  );

  const jobItems = data ? data.jobItems : [];
  return { jobItems, isLoading: isInitialLoading };
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value]);
  return debouncedValue;
}

export function useBookmarkedJobItems() {
  const bookmarkedIds = useBookmarksStore((state) => state.bookmarkedIds);
  const results = useQueries({
    queries: bookmarkedIds.map((id) => ({
      queryKey: ["job-item", id],
      queryFn : () => fetchJobItemData(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: handleError,
    })),
  });
  const bookmarkedJobItems = results.map(result => result.data?.jobItem).filter(data => !!data);
  const isLoading = results.some(result => result.isLoading);
  return {bookmarkedJobItems, isLoading};
}

export function useOnClickOutside(refs : React.RefObject<HTMLElement>[], handler : () => void){
  useEffect(() => {
    const handleClick = (e : MouseEvent) => {
      if (e.target instanceof HTMLElement && refs.every(ref => !ref.current?.contains(e.target as Node))){
        handler();
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [refs, handler]);
}