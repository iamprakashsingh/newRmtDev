import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { usePageNoStore } from "../stores/PageNoStore";
import { useSearchedJobItems } from "../lib/hooks";
import { useEffect } from "react";

export default function PaginationControls() {
  const currentPageNo = usePageNoStore((state) => state.currentPageNo);
  const setCurrentPageNo = usePageNoStore(state => state.setPageNo); 
  const jobItems = useSearchedJobItems().jobItems;
  const totalPages = Math.ceil(jobItems.length / 7);
  useEffect(() => setCurrentPageNo(1), [jobItems]);

  return (
    <section className="pagination">
      {currentPageNo > 1 && <PaginationButton direction="previous" />}
      {currentPageNo < totalPages && <PaginationButton direction="next" />}
    </section>
  );
}

type PaginationButtonProps = {
  direction: "next" | "previous";
};

function PaginationButton({ direction }: PaginationButtonProps) {
  const currentPageNo = usePageNoStore((state) => state.currentPageNo);
  const setCurrentPageNo = usePageNoStore((state) => state.setPageNo);
  const val = direction == "next" ? 1 : -1;

  return (
    <button
      onClick={(e) => {
        e.currentTarget.blur();
        setCurrentPageNo(currentPageNo + val);
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      Page {currentPageNo + val}
      {direction == "previous" ? <ArrowLeftIcon /> : <ArrowRightIcon />}
    </button>
  );
}
