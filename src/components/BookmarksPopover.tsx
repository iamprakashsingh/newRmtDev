import { forwardRef } from "react";
import { useBookmarkedJobItems } from "../lib/hooks";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarkedJobItems();
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>, document.body
  );
});

export default BookmarksPopover;
