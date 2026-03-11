import "./index.css";
import SearchBar from "#/components/ui/searchBar";
import { useEffect, useState } from "react";
import Btn from "#/components/ui/btn";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { requestGenreTypes } from "#/api/requestGenreTypes";
import { requestMovieBySearch } from "#/api/requestMovieBySearch";
import { debounce } from "throttle-debounce";

type GenresType = { genre: string[] }[];

const MovieToolbar = ({
  setSelectedGenre,
}: {
  setSelectedGenre: (value: string | null) => void;
}) => {
  const [genres, setGenres] = useState<string[]>([]);
  const [savedMovies, setSavedMovies] = useState<boolean>(false);
  const [selectHomepage, setSelectHomepage] = useState<boolean>(false);

  const handleOptions = async () => {
    const movieGenre = await requestGenreTypes();
    if (movieGenre) getFilteredMovieGenres(movieGenre);
  };
  const getFilteredMovieGenres = (movieGenre: GenresType) => {
    let allGenres: string[] = [];
    const genres = movieGenre.flatMap(
      ({ genre }: { genre: string[] }) => genre,
    );
    allGenres = [...new Set(genres)] as string[];
    setGenres(allGenres);
  };

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
    if (filterValue != "All") return setSelectedGenre(filterValue);
    return setSelectedGenre(null);
  };
  const searchMovies = debounce(
    1000,
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      requestMovieBySearch(value);
    },
  );

  return (
    <div className="movie-tool-bar">
      <SearchBar placeholder="Search" onChange={searchMovies} />
      <label className="movie-options-parent">
        <select
          id="movie-genre-filter"
          className="movie-options"
          onChange={handleMovieFilter}
        >
          <option>All</option>
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
