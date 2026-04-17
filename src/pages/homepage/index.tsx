import NavBar from "#/components/layouts/navbar";
import MovieList from "#/components/layouts/MovieList";
import "./index.css";
import Slider from "./slider";
import { useEffect, useState } from "react";
import { requestSyncMoviesWithBookmarks } from "#/api/movies/requestSyncMoviesWithBookmarks";

const Homepage = () => {
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleSync = async() => {
      await requestSyncMoviesWithBookmarks();
      setLoading(true);
    }
    handleSync();
     }, [])

  if(!isLoading) return null

  return (
    <div className="homepage">
      <NavBar />
      <Slider />
      <MovieList />
    </div>
  );
};
export default Homepage;
