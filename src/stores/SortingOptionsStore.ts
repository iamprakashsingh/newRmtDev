import {create} from "zustand";

import { JobItem } from "../lib/types";

type Store = {
    sortingParameter : keyof JobItem;
    setSortingParameter : (sortingParameter : keyof JobItem) => void;
}

export const useSortingOptionsStore = create<Store>((set) => ({
    sortingParameter : "relevanceScore",
    setSortingParameter : (sortingParameter) => set({sortingParameter})
}));