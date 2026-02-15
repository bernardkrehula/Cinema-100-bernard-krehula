import { useState } from "react";
import "./index.css";
import { IoBookmarkOutline } from "react-icons/io5";
import Btn from "#/components/ui/btn";
import { IoBookmark } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const SliderImg = ({ src, id }: { src: string, id: string }) => {
  const [savedMovie, setSavedMovie] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSaveMovie = () => setSavedMovie((prev) => !prev);

  const openMovie = () => navigate(`movie/${id}`);

  return (
    <article className="sliderImg">
      <div className="movie-card-overlay">
        <Btn type="button" onClick={handleSaveMovie} variation="secondary-small">
          {savedMovie ? (
            <IoBookmark className="checked-bookmark" />
          ) : (
            <IoBookmarkOutline className="unChecked-bookmark" />
          )}
        </Btn>
        <a onClick={openMovie}>
          See more <IoSearchOutline />
        </a>
      </div>
      <img src={src} />
    </article>
  );
};
export default SliderImg;
