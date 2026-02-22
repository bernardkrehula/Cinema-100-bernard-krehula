import NavBar from "#/components/layouts/navbar";
import MovieList from "../movieList";
import "./index.css";
import Slider from "./slider";

//Odraditi shared layout za filmove

const Homepage = () => {
  return (
    <div className="homepage">
      <NavBar />
      <Slider />
      <MovieList />
    </div>
  );
};
export default Homepage;
