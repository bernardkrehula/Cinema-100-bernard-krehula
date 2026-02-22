import { useEffect, useRef, useState } from "react";
import "./index.css";
import { reuqestMovieList } from "#/api/requestMovieList";
import { requestMoviesArrayLength } from "#/api/requestMoviesArrayLength";

const MovieList = () => {
  const moviesNum = useRef<number | null>(0);
  const [movieListNumber, setMovieListNumber] = useState<number>(0);

  const getMovieListNumber = async () => {
    const movieColumnlength = await requestMoviesArrayLength();
    moviesNum.current = movieColumnlength;
  };
  useEffect(() => {
    /* reuqestMovieList(); */
    getMovieListNumber();
  });
  return <div className="movie-list"></div>;
};
export default MovieList;
