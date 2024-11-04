import { useEffect, useMemo } from "react";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useSearchedJobItems } from "../lib/hooks";
import { useSortingOptionsStore } from "../stores/SortingOptionsStore";
import { JobItem } from "../lib/types";
import { usePageNoStore } from "../stores/PageNoStore";
import { RESULTS_PER_PAGE } from "../lib/constants";

export default function Sidebar() {

  const setCurrentPageNo = usePageNoStore(state => state.setPageNo); 
  const setSortingParameter = useSortingOptionsStore(state => state.setSortingParameter);
  const {jobItems, isLoading} = useSearchedJobItems(); 
  const currentPageNo = usePageNoStore(state => state.currentPageNo);
  const sortingParameter = useSortingOptionsStore(state => state.sortingParameter);
  const sortedJobItems = useMemo(() => [...jobItems].sort((a, b) => a[sortingParameter] < b[sortingParameter] ? -1 : 1), [sortingParameter, jobItems]);
  const jobItemsSliced = useMemo(() => sortedJobItems.slice((currentPageNo - 1) *  RESULTS_PER_PAGE, RESULTS_PER_PAGE + (currentPageNo - 1) * RESULTS_PER_PAGE), [sortedJobItems, currentPageNo]);

  useEffect(() => {setSortingParameter("relevanceScore")}, [jobItems]);

  const handleChangeSortingParameter = (sortingParameter : keyof JobItem) => {
    setCurrentPageNo(1); 
    setSortingParameter(sortingParameter);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount/>
        <SortingControls onClick={handleChangeSortingParameter}/>
      </div>
      <JobList jobItems={jobItemsSliced} isLoading = {isLoading}/>
      <PaginationControls/>
    </div>
  );
}
