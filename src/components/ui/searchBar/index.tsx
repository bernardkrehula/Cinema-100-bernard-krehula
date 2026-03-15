import "./index.css";
import Btn from "../btn";
import { IoIosSearch } from "react-icons/io";

type SearchBarType = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
};

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
