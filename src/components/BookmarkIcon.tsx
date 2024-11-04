import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksStore } from "../stores/BookmarksStore";

type  BookmarkIconProps = {
  id : number;
}

export default function BookmarkIcon({id} : BookmarkIconProps) {

  const bookmarkedIds = useBookmarksStore(state => state.bookmarkedIds);
  const toggleBookmark = useBookmarksStore(state => state.toggleBookmark);

  return (
    <button className="bookmark-btn">
      <BookmarkFilledIcon onClick = {
        (e) => {
          toggleBookmark(id);
          e.stopPropagation();
          e.preventDefault();
        } 
      } className= {`${bookmarkedIds.includes(id) ? "filled" : ""}`} />
    </button>
  );
}
