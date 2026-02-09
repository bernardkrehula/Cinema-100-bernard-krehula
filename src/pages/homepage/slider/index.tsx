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

  const slideOnClick = (side: string) => {
    if (!trendingMovies) return;

    const visibleItems = 4;
    const itemWidth = 230;
    const gap = 5;

    const step = visibleItems * (itemWidth + gap);
    const totalWidth = trendingMovies.length * (itemWidth + gap);
    const visibleWidth = visibleItems * (itemWidth + gap);

    const maxTranslate = totalWidth - visibleWidth;

    if (side === "right") {
      setPosition((prev) => (Math.abs(prev) >= maxTranslate ? 0 : prev - step));
    }

    if (side === "left") {
      setPosition((prev) => (prev === 0 ? -maxTranslate : prev + step));
    }
  };
  
  return (
    <div className="slider">
      <h2 className="slider-title">Currently trending</h2>
      <div className="active-movie-line">
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
        <div className="block"></div>
      </div>
      <div className="slider-content">
        <Btn type="button" onClick={() => slideOnClick("left")}>
          <MdKeyboardArrowLeft className="left-arrow"/>
        </Btn>
        <div className="slider-box">
          <div
            className="slider-box-content"
            style={{ transform: `translateX(${position}px)` }}
          >
            {trendingMovies?.map((movie) => {
              const { id, image } = movie;

              return <SliderImg key={id} src={image} />;
            })}
          </div>
        </div>
        <Btn type="button" onClick={() => slideOnClick("right")}>
          <MdKeyboardArrowRight className="right-arrow"/>
        </Btn>
      </div>
    </div>
  );
};
export default Slider;
