import {create} from "zustand";

type Store = {
    activeId : number | null;
    setActiveId : (activeId : number) => void;
};

export const useActiveIdStore = create<Store>((set) => ({
    activeId : null,
    setActiveId : (activeId : number) => {
        set(() => ({activeId}))
    }
}));
