import { useState } from 'react';
import './index.css'

type SearchBarType = {
    value: string;
}

const SearchBar = ({value}: SearchBarType) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputValue = () => setInputValue(value);

    return(
        <div className='searchbar'>
            <input value={inputValue} onChange={handleInputValue}/>
        </div>
    )
}
export default SearchBar;