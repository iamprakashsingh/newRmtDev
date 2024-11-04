import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  bookmarkedIds: number[];
  toggleBookmark: (id: number) => void;
};

export const useBookmarksStore = create<Store>()(persist((set) => ({
  bookmarkedIds: [],
  toggleBookmark: (id) =>
    set((state) => {
      const bookmarkedIds = state.bookmarkedIds;
      if (state.bookmarkedIds.includes(id))
        return {
          bookmarkedIds: state.bookmarkedIds.filter((bookmark) => bookmark != id),
        };
      return { bookmarkedIds: [...bookmarkedIds, id] };
    }),
}),  {name : "bookmarks"}));



