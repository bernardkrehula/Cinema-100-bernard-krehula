import NavBar from "#/components/layouts/navbar";
import { useEffect } from "react";
import MovieList from "../movieList";
import "./index.css";
import Slider from "./slider";
import { UserAuth } from "#/context/AuthContext";
import { useNavigate } from "react-router";

const Homepage = () => {
  const navigate = useNavigate();
  const {session} = UserAuth();

  useEffect(() => {
    if (!session) navigate("/");
    else navigate("/homepage");
  }, [session]);

  return (
    <div className="homepage">
      <NavBar />
      <Slider />
      <MovieList />
    </div>
  );
};
export default Homepage;
