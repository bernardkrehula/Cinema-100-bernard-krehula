import NavBar from "#/components/layouts/navbar";
import MovieToolbar from "#/components/layouts/movieToolbar";
import MovieList from "../movieList";
import "./index.css";
import Slider from "./slider";

const Homepage = () => {
  return (
    <div className="homepage">
      <NavBar />
      <Slider />
      <MovieToolbar />
      <MovieList />
    </div>
  );
};
export default Homepage;
