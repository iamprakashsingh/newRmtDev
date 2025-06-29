
import { useSearchTextStore } from "../stores/searchTextStore";


export default function SearchForm() {

  const searchText = useSearchTextStore(state => state.searchText);
  const onSearchTextChange = useSearchTextStore(state => state.setSearchText);

  return (
    <form onSubmit={(e) => e.preventDefault()} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange = {e => onSearchTextChange(e.target.value)}
        value = {searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
