import { forwardRef } from "react";
import { useBookmarkedJobItems } from "../lib/hooks";
import JobList from "./JobList";
import { createPortal } from "react-dom";
import { JobItem, JobItemData } from "../lib/types"; // make sure JobItemData is imported

const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarkedJobItems();
  //changes made
  // Filter undefined and map to JobItem
  const jobItems: JobItem[] = (bookmarkedJobItems ?? [])
    .filter((item): item is JobItemData => item !== undefined)
    .map((item) => ({
      id: item.id,
      badgeLetters: item.badgeLetters,
      title: item.title,
      company: item.company,
      date: item.date,
      relevanceScore: item.relevanceScore,
      daysAgo: item.daysAgo,
    }));

  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={jobItems} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;