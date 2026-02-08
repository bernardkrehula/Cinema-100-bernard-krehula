import { useState } from 'react';
import './index.css';

const SliderImg = ({src}: {src: string}) => {
    const [acitvateShadow, enableShadow] = useState<boolean>(false);

    const handleHover = () => {
        enableShadow(prev => !prev);
    }
    return(
        <div className='sliderImg' onClick={handleHover} style={{opacity: "0.6"}}>
            <img src={src}/>
        </div>
    )
}
export default SliderImg;