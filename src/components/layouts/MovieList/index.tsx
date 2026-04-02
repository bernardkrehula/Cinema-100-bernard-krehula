import { useEffect, useState } from "react";
import "./index.css";
import { useQuery } from "@tanstack/react-query";
import MovieIcon from "./MovieIcon";
import Btn from "#/components/ui/btn";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import MovieToolbar from "#/components/layouts/MovieToolbar";
import { requestFilteredMovies } from "#/api/movies/requestFilteredMovies";

const MovieList = () => {
  const [movieFilter, setMovieFilter] = useState({
    filters: {
      search: "",
      genre: null as string | null,
    },
    range: {
      from: 0,
      to: 11,
    },
  });
  const [moviePageNumbers, setMoviePageNumbers] = useState<number[]>([0]);
  const [currentMoviePage, setCurrentMoviePage] = useState<number>(1);
  const { data: moviePages } = useQuery({
    queryKey: ["movie-pages", movieFilter],
    queryFn: () => requestFilteredMovies(movieFilter),
  });

  const getMovieListNumber = async () => {
    const visibleMoviesNum = 12;

    if (moviePages?.count) {
      const movieNum = Math.ceil(moviePages.count / visibleMoviesNum);
      const list = [];

      for (let i = 1; i <= movieNum; i++) {
        list.push(i);
      }
      setMoviePageNumbers(list);
    }
  };
  useEffect(() => {
    if (moviePages?.count) getMovieListNumber();
  }, [moviePages]);

  useEffect(() => {
    const resetPaginationNumbers = () => {
      setCurrentMoviePage(1);
      setMovieFilter((prev) => ({
        ...prev,
        range: { ...prev.range, from: 0, to: 11 },
      }));
    };
    resetPaginationNumbers();
  }, [movieFilter.filters.genre]);

  const calculateMovieRange = (page: number) => {
    setCurrentMoviePage(page);

    let indexRange = { from: 0, to: 11 };
    if (page != 1) {
      indexRange.from = 12 * (page - 1);
      indexRange.to = indexRange.from + 11;
    } else {
      indexRange.from = 0;
      indexRange.to = 11;
    }
    setMovieFilter((prev) => ({
      ...prev,
      range: { ...prev.range, from: indexRange.from, to: indexRange.to },
    }));
  };
  const leftArrowClick = () => {
    setMovieFilter((prev) => {
      if (prev.range.from > 0) {
        return {
          ...prev,
          range: {
            ...prev.range,
            from: prev.range.from - 12,
            to: prev.range.to - 12,
          },
        };
      }
      return prev;
    });
    setCurrentMoviePage((prev) => {
      if (prev > 1) return prev - 1;
      return prev;
    });
  };
  const rightArrowClick = () => {
    setMovieFilter((prev) => {
      if (
        moviePages?.count &&
        prev.range.from >= 0 &&
        prev.range.to < moviePages.count
      ) {
        return {
          ...prev,
          range: {
            ...prev.range,
            from: prev.range.from + 12,
            to: prev.range.to + 12,
          },
        };
      }
      return prev;
    });
    setCurrentMoviePage((prev) => {
      if (prev < moviePageNumbers.length) return prev + 1;
      return prev;
    });
  };
  console.log(moviePageNumbers.length)
  return (
    <div className="movie-list">
      <MovieToolbar setMovieFilter={setMovieFilter} />
      <ul className="movie-list-content">
        {moviePages?.data?.map((page, index) => {
          return <MovieIcon key={index} {...page} />;
        })}
      </ul>
      {moviePageNumbers.length > 1 && (
        <div className="list-numbers">
          <Btn type="button" variation="primary-large" onClick={leftArrowClick}>
            <MdKeyboardArrowLeft />
          </Btn>
          {moviePageNumbers.map((page) => {
            return (
              <Btn
                type="button"
                variation={`primary-large ${currentMoviePage === page ? "active-page" : ""}`}
                key={page}
                onClick={() => {
                  calculateMovieRange(page);
                  setCurrentMoviePage(page);
                }}
              >
                {page}
              </Btn>
            );
          })}
          <Btn
            type="button"
            variation="primary-large"
            onClick={rightArrowClick}
          >
            <MdKeyboardArrowRight />
          </Btn>
        </div>
      )}
    </div>
  );
};
export default MovieList;
