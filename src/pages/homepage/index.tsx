import NavBar from "#/components/layouts/navbar";
import MovieList from "#/components/layouts/MovieList";
import "./index.css";
import Slider from "./slider";


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
