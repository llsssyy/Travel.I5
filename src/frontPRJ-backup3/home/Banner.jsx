import React from "react";
import '../css/banner.css';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {   

    return(
        <>
            <div id="banner_wrap">      
                <div className="banner1">
                    <a href="#none">
                        <img src='./resources/prj_imgs/banner/banner01.png' />
                    </a>
                </div>
                <div className="banner2">
                    <a href="#none">
                        <img src='./resources/prj_imgs/banner/banner02.png' />
                    </a>
                </div>
                <div className="banner3">
                    <a href="#none">
                        <img src='./resources/prj_imgs/banner/banner03.png' />
                    </a>
                </div>
            </div>
        </>
    );
}

export default Banner;