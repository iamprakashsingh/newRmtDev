import Logo from "./Logo";
import SearchForm from "./SearchForm";
import BookmarksButton from "./BookmarksButton";

export default function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <Logo/>
        <BookmarksButton/>
      </div>
      <SearchForm/>
    </header>
  );
}
