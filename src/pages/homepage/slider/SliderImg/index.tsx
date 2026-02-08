import { useState } from 'react';
import './index.css';
import { IoBookmarkOutline } from "react-icons/io5";
import Btn from '#/components/ui/btn';
import { IoBookmark } from "react-icons/io5";


const SliderImg = ({src}: {src: string}) => {
    const [acitvateShadow, enableShadow] = useState<boolean>(false);
    const [savedMovie, setSavedMovie] = useState<boolean>(false);

    const handleHover = () => {
        enableShadow(prev => !prev);
    }
    const handleSaveMovie = () => setSavedMovie(prev => !prev);

    return(
        <article className='sliderImg' onClick={handleHover}>
            <div className='movie-card-overlay'>
                <Btn type='button' onClick={handleSaveMovie}>
                    {savedMovie ? <IoBookmark className='checked-bookmark'/> : <IoBookmarkOutline className='unChecked-bookmark'/>}
                </Btn> 
            </div>
            <img src={src}/>
        </article>
    )
}
export default SliderImg;