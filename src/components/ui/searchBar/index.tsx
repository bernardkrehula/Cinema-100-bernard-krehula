import { useState } from 'react';
import './index.css'
import Btn from '../btn';
import { IoIosSearch } from "react-icons/io";


type SearchBarType = {
    value: string;
    placeholder: string;
}

const SearchBar = ({value, placeholder}: SearchBarType) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputValue = () => setInputValue(value);

    return(
        <div className='searchbar'>
            <input placeholder={placeholder} value={inputValue} onChange={handleInputValue}/>
            <Btn type='button'>
                <IoIosSearch />
            </Btn>
        </div>
    )
}
export default SearchBar;