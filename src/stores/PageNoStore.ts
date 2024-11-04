import {create} from "zustand";

type Store = {
    currentPageNo : number;
    setPageNo : (currentPageNo : number) => void;
};

export const usePageNoStore = create<Store>((set) => ({
    currentPageNo : 1,
    setPageNo : (currentPageNo) => set({currentPageNo}),
}));