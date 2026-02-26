import NavBar from "#/components/layouts/navbar";
import SearchBar from "#/components/ui/searchBar";
import MovieList from "../movieList";
import "./index.css";
import Slider from "./slider";

//Odraditi shared layout za filmove

const Homepage = () => {
  return (
    <div className="homepage">
      <NavBar />
      <Slider />
      <SearchBar />
      <MovieList />
    </div>
  );
};
export default Homepage;
