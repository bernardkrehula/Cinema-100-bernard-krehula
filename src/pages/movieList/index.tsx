import { useEffect, useRef, useState } from "react";
import "./index.css";
import { reuqestMovieList } from "#/api/requestMovieList";
import { requestMoviesArrayLength } from "#/api/requestMoviesArrayLength";
import { useQuery } from "@tanstack/react-query";
import MovieIcon from "./MovieIcon";
import Btn from "#/components/ui/btn";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const MovieList = () => {
  const [moviePageNumbers, setMoviePageNumbers] = useState<number[]>([0]);
  const movieRange = useRef<{ from: number; to: number }>({ from: 0, to: 11 });
  const [currentMoviePage, setCurrentMoviePage] = useState<number>(0);
  const { data: moviePages } = useQuery({
    queryKey: ["movie-pages", currentMoviePage],
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

  const calculateMovieRange = (page: number) => {
    setCurrentMoviePage(page);

    let indexRange = { from: 0, to: 11 };
    if (page != 1) {
      indexRange.from = 12 * (page - 1);
      indexRange.to = indexRange.to * page + 1;
    } else {
      indexRange.from = 0;
      indexRange.to = 11;
    }
    movieRange.current = indexRange;
  };

  return (
    <div className="movie-list">
      <div className="movie-list-content">
        {moviePages?.map((page, index) => {
          return <MovieIcon key={index} {...page} />;
        })}
      </div>
      <div className="list-numbers">
        <Btn type="button" variation="primary-large">
          <MdKeyboardArrowLeft />
        </Btn>
        {moviePageNumbers.map((page) => {
          return (
            <Btn
              type="button"
              variation="primary-large"
              key={page}
              onClick={() => calculateMovieRange(page)}
            >
              {page}
            </Btn>
          );
        })}
        <Btn type="button" variation="primary-large nav-arrow">
          <MdKeyboardArrowRight />
        </Btn>
      </div>
    </div>
  );
};
export default MovieList;
