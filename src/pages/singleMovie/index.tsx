import { useParams } from "react-router";
import "./index.css";
import { requestSingleMovie } from "#/api/requestSingleMovie";
import { useQuery } from "@tanstack/react-query";
import NavBar from "#/components/layouts/navbar";

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
    rank,
    genre,
    description,
    director,
    writers,
    image,
    trailer,
    rating,
    year,
  } = movie;
  const convertedGenre = JSON.parse(genre);
  const convertedDirector = JSON.parse(director);
  const convertedWriters = JSON.parse(writers);

  return (
    <div className="single-movie" key={id}>
      <NavBar />
      <div className="single-movie-content">
        <div className="movie-textual-info-top">
          <div className="movie-title">
            <h1>{title}</h1>
            <span>({year})</span>
          </div>
          <div className="movie-rating">
            <h2>Imdb rating</h2>
            <span>{rating}</span>
          </div>
          <div className="movie-rank">
            <h2>Rank</h2>
            <span>{rank}</span>
          </div>
        </div>
        <div className="movie-frame">
          <img src={image} />
          <iframe
            src={trailer}
            title="Movie trailer"
            allowFullScreen
          />
        </div>
        <article>
          <ul>
            {convertedGenre.map((type: string, index: number) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
          <p>{description}</p>
          <dl>
            <dt>Director</dt>
            <dd>{convertedDirector}</dd>
            <hr />
            <dt>Writers</dt>
            <ul>
              {convertedWriters.map((type: string, index: number) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </dl>
        </article>
      </div>
    </div>
  );
};
export default SingleMovie;
