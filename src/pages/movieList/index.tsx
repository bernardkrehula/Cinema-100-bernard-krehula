import { useEffect, useRef, useState } from "react";
import "./index.css";
import { reuqestMovieList } from "#/api/requestMovieList";
import { requestMoviesArrayLength } from "#/api/requestMoviesArrayLength";
import { useQuery } from "@tanstack/react-query";
import MovieIcon from "./MovieIcon";

const MovieList = () => {
  const [moviePageNumbers, setMoviePageNumbers] = useState<number[]>([0]);
  const movieRange = useRef<{ from: number; to: number }>({ from: 0, to: 11 });
  const { data: moviePages } = useQuery({
    queryKey: ["movie-pages"],
    queryFn: () => reuqestMovieList(movieRange.current),
  });

  const getMovieListNumber = async () => {
    const movieColumnlength = await requestMoviesArrayLength();
    const visibleMoviesNum = 12;

    if (movieColumnlength) {
      const movieNum = Math.ceil(movieColumnlength / visibleMoviesNum);
      const list = [];

      for (let i = 1; i <= movieNum; i++) {
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
      indexRange.from = 12 * (moviePage - 1);
      indexRange.to = indexRange.to * moviePage + 1;
    } else {
      indexRange.from = 0;
      indexRange.to = 11;
    }
    movieRange.current = indexRange;
  };
  if (!moviePages) return null;

  return (
    <div className="movie-list">
      <div className="movie-list-content">
        {moviePages.map((page, index) => {
          return <MovieIcon key={index} {...page} />;
        })}
      </div>
      {moviePageNumbers.map((page) => {
        return (
          <span key={page} onClick={calculateMovieRange}>
            {page}
          </span>
        );
      })}
    </div>
  );
};
export default MovieList;
