import "./index.css";
import Btn from "../btn";
import { IoIosSearch } from "react-icons/io";
import type { SearchBarType } from "#/types/ui.types.ts/SearchBarType";

const SearchBar = ({ onClick, onChange, onKeyDown, placeholder }: SearchBarType) => {
  return (
    <div className="searchbar">
      <input
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <Btn type="button" onClick={onClick}>
        <IoIosSearch />
      </Btn>
    </div>
  );
};
export default SearchBar;
