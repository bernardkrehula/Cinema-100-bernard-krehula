import './index.css'
import SearchBar from "#/components/ui/searchBar";

const MovieToolbar = () => {
    return(
        <div className="movie-tool-bar">
            <SearchBar placeholder="Search" value=''/>
        </div>
    )
}
export default MovieToolbar;