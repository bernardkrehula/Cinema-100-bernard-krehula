import { useState } from "react";
import "./index.css";
import { IoBookmarkOutline } from "react-icons/io5";
import Btn from "#/components/ui/btn";
import { IoBookmark } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";

const SliderImg = ({ src }: { src: string }) => {
  const [savedMovie, setSavedMovie] = useState<boolean>(false);

  const handleSaveMovie = () => setSavedMovie((prev) => !prev);

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
        <a href="#">
          See more <IoSearchOutline />
        </a>
      </div>
      <img src={src} />
    </article>
  );
};
export default SliderImg;
