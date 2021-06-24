import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import classes from './slider.module.css';
import pic1 from './1.jpg';
import pic2 from './2.jpg';
import pic3 from './3.jpg';


class Slider extends React.Component {
    render() {
        return (
            <div className={[classes["images"]]}>
                {/* <h2>My Image Gallery</h2> */}
                <Carousel autoPlay interval="1000" transitionTime="1000">
                    <div>
                        <img src={pic1} />
                        {/* <p className="legend">My Classic Still 1</p> */}
                    </div>
                    <div>
                        <img src={pic2} />
                        {/* <p className="legend">My Classic Still 2</p> */}
                    </div>
                    <div>
                        <img src={pic3} />
                        {/* <p className="legend">My Classic Still 3</p> */}
                    </div>
                </Carousel>
            </div>
        )
    };
}

export default Slider;