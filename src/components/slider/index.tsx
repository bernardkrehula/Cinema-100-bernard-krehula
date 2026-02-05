import "./index.css";
import SliderImg from "./SliderImg";
import { requestTrendingMovies } from "../../api/requestTrendingMovies";
import { useQuery } from "@tanstack/react-query";

const Slider = () => {
  const { data: trendingMovies } = useQuery({
    queryKey: ["trending-movies"],
    queryFn: () => requestTrendingMovies()
  });
  return (
    <div className="slider">
      {trendingMovies?.map((movie) => {
        const { id, image } = movie;

        return <SliderImg key={id} src={image} />;
      })}
    </div>
  );
};
export default Slider;
