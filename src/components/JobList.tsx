import { JobItem } from "../lib/types"; import JobListItem from "./JobListItem";
import Spinner from "./Spinner";
import { useActiveIdStore } from "../stores/activeIdStore";

type JobListProps = {
  jobItems: JobItem[];
  isLoading : boolean;
}

export function JobList({jobItems, isLoading}: JobListProps) {
  const activeId = useActiveIdStore(state => state.activeId);
  
  return (
    <ul className="job-list">
      {isLoading ? (
        <Spinner />
      ) : (
        jobItems.map((jobItem: JobItem) => (
          <JobListItem isActive = {activeId === jobItem.id} key={jobItem.id} jobItem={jobItem} />
        ))
      )}
    </ul>
  );
}

export default JobList;
