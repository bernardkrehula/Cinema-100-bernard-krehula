import { useEffect, useState } from "react";
import "./index.css";
import { reuqestMovieList } from "#/api/requestMovieList";
import { requestMoviesArrayLength } from "#/api/requestMoviesArrayLength";
import SliderImg from "../homepage/slider/SliderImg";

const MovieList = () => {
  const [listMovies, setListMovies] = useState([]);
  const [moviePageNumbers, setMoviePageNumbers] = useState<number[]>([0]);

  const getMovieListNumber = async () => {
    const movieColumnlength = await requestMoviesArrayLength();
    const visibleMoviesNum = 12;

    if (movieColumnlength) {
      const movieNum = Math.ceil(movieColumnlength / visibleMoviesNum);
      const list = [];

      for (let i = 0; i <= movieNum; i++) {
        list.push(i);
      }
      setMoviePageNumbers(list);
    }
  };
  useEffect(() => {
    getMovieListNumber();
  }, []);

  const calculateMovieRange = (e: React.MouseEvent<HTMLSpanElement>) => {
    const moviePage = Number((e.target as HTMLSpanElement).textContent);
    let indexRange = { from: 0, to: 11 };
    if (moviePage != 1) {
      indexRange.from += 12 * moviePage;
      indexRange.to += 12 * moviePage;
    } else {
      indexRange.from = 0;
      indexRange.to = 11;
    }
  };

  return (
    <div className="movie-list">
      {moviePageNumbers.map((page) => {
        return <span key={page} onClick={calculateMovieRange}>{page}</span>;
      })}
    </div>
  );
};
export default MovieList;
