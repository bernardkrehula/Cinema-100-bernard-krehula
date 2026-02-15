import "./index.css";
import SliderImg from "./SliderImg";
import { useQuery } from "@tanstack/react-query";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import Btn from "#/components/ui/btn";
import { requestTrendingMovies } from "#/api/requestTrendingMovies";

const Slider = () => {
  const [position, setPosition] = useState<number>(0);
  const [acitvePage, setActivePage] = useState<number>(0);
  const { data: trendingMovies } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => requestTrendingMovies(),
  });

  if (!trendingMovies) return;

  const visibleMovies = 4;
  const totalPages = trendingMovies.length / visibleMovies;

  const slideOnClick = (side: string) => {
    const visibleItems = 4;
    const itemWidth = 230;
    const gap = 5;

    const step = visibleItems * (itemWidth + gap);
    const totalWidth = trendingMovies.length * (itemWidth + gap);
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
        {Array.from({ length: totalPages }).map((_, index) => {
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
            {trendingMovies?.map((movie) => {
              const { id, image } = movie;

              return <SliderImg key={id} src={image} id={id} />;
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
