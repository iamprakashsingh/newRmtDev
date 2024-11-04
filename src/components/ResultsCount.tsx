import { useSearchedJobItems } from "../lib/hooks";

export default function ResultsCount() {
  const totalResults = useSearchedJobItems().jobItems.length;
  return <p className="count"><span className = "u-bold">{totalResults}</span> results</p>;
}
