import "./index.css";
import MovieImg from "../../../components/ui/MovieImg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import Btn from "#/components/ui/btn";
import { requestTrendingMovies } from "#/api/movies/requestTrendingMovies";

const Slider = () => {
  const table = 'trending_movies';
  const [position, setPosition] = useState<number>(0);
  const [acitvePage, setActivePage] = useState<number>(0);
  const [allPages, setAllPages] = useState<number>(0);
  const { data: trendingMovies, isLoading } = useQuery({
    queryKey: [table],
    queryFn: () => requestTrendingMovies(),
  });
  
  const slideOnClick = (side: string) => {
    if (!trendingMovies || trendingMovies.data.length === 0) return;

    const visibleMovies = 4;
    const totalPages = trendingMovies.data.length / visibleMovies;
    setAllPages(totalPages);
    const visibleItems = 4;
    const itemWidth = 304.26;
    const gap = 5;

    const step = visibleItems * (itemWidth + gap);
    const totalWidth = trendingMovies.data.length * (itemWidth + gap);
    const visibleWidth = visibleItems * (itemWidth + gap);

    const maxTranslate = totalWidth - visibleWidth;

    if (side === "right") {
      setActivePage((p) => p + 1);
      setPosition((prev) => {
        if (Math.abs(prev) >= maxTranslate) {
          setActivePage(0);
          return 0;
        }
        return prev - step;
      });
    }

    if (side === "left") {
      setActivePage((p) => p - 1);
      setPosition((prev) => {
        if (prev === 0) {
          setActivePage(totalPages - 1);
          return -maxTranslate;
        }
        return prev + step;
      });
    }
  };

  return (
    <div className="slider">
      <h2 className="slider-title">Currently trending</h2>
      <div className="active-movie-line">
        {Array.from({ length: allPages }).map((_, index) => {
          return (
            <div
              key={index}
              className={`block ${acitvePage === index ? "active" : ""}`}
            ></div>
          );
        })}
      </div>
      <div className="slider-content">
        <Btn type="button" onClick={() => slideOnClick("left")}>
          <MdKeyboardArrowLeft className="left-arrow" />
        </Btn>
        <div className="slider-box">
          <div
            className="slider-box-content"
            style={{ transform: `translateX(${position}px)` }}
          >
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="skeleton" />
                ))
              : trendingMovies?.data.map((movie) => {
                  const { id } = movie;
                  
                  return <MovieImg key={id} table={table} movie={movie} />;
                })}
          </div>
        </div>
        <Btn type="button" onClick={() => slideOnClick("right")}>
          <MdKeyboardArrowRight className="right-arrow" />
        </Btn>
      </div>
    </div>
  );
};
export default Slider;
