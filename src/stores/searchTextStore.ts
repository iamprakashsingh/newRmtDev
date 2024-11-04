import {create} from "zustand";

type Store = {
    searchText : string,
    setSearchText : (text : string) => void
}

export const useSearchTextStore = create<Store>((set) => ({
    searchText : "",
    setSearchText : (text) => {
        set(() => ({searchText : text}))
    } 
}));