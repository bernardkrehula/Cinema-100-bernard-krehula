import { useParams } from "react-router";
import "./index.css";
import { requestSingleMovie } from "#/api/requestSingleMovie";
import { useQuery } from "@tanstack/react-query";

const SingleMovie = () => {
  const { movieID } = useParams();
  const { data: movie } = useQuery({
    queryKey: [`movie-${movieID}`],
    queryFn: () => requestSingleMovie(movieID),
  });

  if (!movie) return;
  const {
    id,
    title,
    imdbid,
    rank,
    genre,
    description,
    director,
    writers,
    image,
    trailer,
    thumbnail,
    rating,
    year
  } = movie;
  console.log(id);
  return <div className="single-movie"></div>;
};
export default SingleMovie;
