import "./index.css";
import SearchBar from "#/components/ui/searchBar";
import { useEffect, useState, MouseEventHandler } from "react";
import { requestSingleMovie } from "#/api/requestSingleMovie";
import Btn from "#/components/ui/btn";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { reuqestMovieByGenre } from "#/api/requestMovieByGenre";
import { requestGenreTypes } from "#/api/requestGenreTypes";

const MovieToolbar = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [savedMovies, setSavedMovies] = useState<boolean>(false);
  const [selectHomepage, setSelectHomepage] = useState<boolean>(false);

  const handleOptions = async () => {
    const movieGenre = await requestGenreTypes();
/*     setGenres(Object.keys(movieGenre));
 */  };

  useEffect(() => {
    handleOptions();
  }, []);

  const handleSavedMovies = () => {
    setSavedMovies(true);
    setSelectHomepage(false);
  };
  const handleHomepageSelect = () => {
    setSelectHomepage(true);
    setSavedMovies(false);
  };
  const handleMovieFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = e.target.value;
    await reuqestMovieByGenre(filterValue);
  };
 
  return (
    <div className="movie-tool-bar">
      <SearchBar placeholder="Search" value="" />
      <label className="movie-options-parent">
        <select id="movie-genre-filter" className="movie-options" onChange={handleMovieFilter}>
          {genres.map((genre, index) => {
            return (
              <option key={index} value={genre}>
                {genre}
              </option>
            );
          })}
        </select>
        <div className="movie-options-arrow">
          <IoMdArrowDropdown />
        </div>
      </label>
      <Btn
        type="button"
        onClick={handleSavedMovies}
        variation="secondary-small"
      >
        {savedMovies ? (
          <IoBookmark className="tool-bar-bookmark" />
        ) : (
          <IoBookmarkOutline className="tool-bar-bookmark" />
        )}
      </Btn>
      <Btn type="button" onClick={handleHomepageSelect}>
        <FaHouse className="home" fill={selectHomepage ? "white" : "none"} />
      </Btn>
    </div>
  );
};
export default MovieToolbar;
