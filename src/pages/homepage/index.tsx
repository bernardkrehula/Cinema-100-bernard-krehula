import "./index.css";
import NavBar from "../../components/layouts/navbar";
import Slider from "./slider";

//Odraditi shared layout za filmove

const Homepage = () => {
  return (
    <div className="homepage">
      <NavBar />
      <Slider />
    </div>
  );
};
export default Homepage;
