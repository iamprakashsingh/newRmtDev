import { useSortingOptionsStore } from "../stores/SortingOptionsStore";
import { JobItem } from "../lib/types";

type SortingControlsProps = {
  onClick: (sortingParameter : keyof JobItem) => void;
};

export default function SortingControls({onClick} : SortingControlsProps) {

  const sortingParameter = useSortingOptionsStore(state => state.sortingParameter);

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <button onClick = {() => onClick("relevanceScore")} className={`${sortingParameter ===  "relevanceScore" ? "sorting__button--active": ""} sorting__button sorting__button--relevant`}>
        Relevant
      </button>

      <button onClick = {() => onClick("daysAgo")} className={`${sortingParameter === "daysAgo" ? "sorting__button--active" : ""} sorting__button sorting__button--recent`}>
        Recent
      </button>
    </section>
  );
}
