import { useEffect, useState } from "react";
import "./index.css";
import { reuqestMovieList } from "#/api/requestMovieList";
import { useQuery } from "@tanstack/react-query";
import MovieIcon from "./MovieIcon";
import Btn from "#/components/ui/btn";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import MovieToolbar from "#/components/layouts/movieToolbar";
import { reuqestMovieByGenre } from "#/api/requestMovieByGenre";

const MovieList = () => {
  const [moviePageNumbers, setMoviePageNumbers] = useState<number[]>([0]);
  const [movieRange, setMovieRange] = useState<{ from: number; to: number }>({
    from: 0,
    to: 11,
  });
  const [currentMoviePage, setCurrentMoviePage] = useState<number>(1);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const { data: moviePages } = useQuery({
    queryKey: ["movie-pages", currentMoviePage, selectedGenre],
    queryFn: () => handleMovieRequests(),
  });

  const handleMovieRequests = () => {
    if (selectedGenre) return reuqestMovieByGenre(selectedGenre, movieRange);
    return reuqestMovieList(movieRange);
  };

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
    handleMovieRequests();
  }, []);
  useEffect(() => {
    if (moviePages?.count) getMovieListNumber();
  }, [moviePages]);
  useEffect(() => {
    const resetPaginationNumbers = () => {
      setCurrentMoviePage(1);
      setMovieRange((prev) => ({ ...prev, from: 0, to: 11 }));
    };
    resetPaginationNumbers();
  }, [selectedGenre]);

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
    setMovieRange(indexRange);
  };
  const leftArrowClick = () => {
    setMovieRange((prev) => {
      if (prev.from > 0) {
        return {
          from: prev.from - 12,
          to: prev.to - 12,
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
    setMovieRange((prev) => {
      if (prev.from >= 0 && prev.to < moviePages?.count) {
        return {
          from: prev.from + 12,
          to: prev.to + 12,
        };
      }
      return prev;
    });
    setCurrentMoviePage((prev) => {
      if (prev < moviePageNumbers.length) return prev + 1;
      return prev;
    });
  };

  return (
    <div className="movie-list">
      <MovieToolbar setSelectedGenre={setSelectedGenre} />
      <ul className="movie-list-content">
        {moviePages?.data?.map((page, index) => {
          return <MovieIcon key={index} {...page} />;
        })}
      </ul>
      {
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
      }
    </div>
  );
};
export default MovieList;
