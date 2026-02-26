import './index.css'
import SearchBar from "#/components/ui/searchBar";
import { useEffect, useState } from 'react';
import { requestSingleMovie } from '#/api/requestSingleMovie';

const MovieToolbar = () => {
    const [options, setOptions] = useState<string[]>([]);

    const handleOptions = async() => {
        const movieSearch = await requestSingleMovie("top1");
        setOptions(Object.keys(movieSearch));
    }

    useEffect(() => {
        handleOptions();
    },[])
    
    return(
        <div className="movie-tool-bar">
            <SearchBar placeholder="Search" value=''/>
            <select>
                {options.map(opt => {
                    return <option value={opt}>{opt}</option>
                })}
            </select>
        </div>
    )
}
export default MovieToolbar;