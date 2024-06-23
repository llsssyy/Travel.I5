import React, { useRef, useState } from "react";
import '../css/banner.css';

const Banner = () => {   
    //hook
    const [isOpenImg, setIsOpenImg] = useState(false);
    const [bannerNo, setBannerNo] = useState();

    const outside = useRef();	

    //handler
    const banner1ClickHandler = (bn) => {
        console.log('open Banner!!');

        console.log('bn : ', bn);

        setIsOpenImg(true);
        setBannerNo(bn);
    }

    const closeBtnClickHandler = () => {
        console.log('btn CLICKED!!');
        console.log('background click!');

        setIsOpenImg(false);
    }

    return(
        <>
            <div id="banner_wrap">      
                <div className="banner1">
                    <a href="#none" onClick={()=>banner1ClickHandler(1)}>
                        <img src='./resources/prj_imgs/banner/banner01.png' />
                    </a>
                </div>
                <div className="banner2">
                    <a href="#none" onClick={()=>banner1ClickHandler(2)}>
                        <img src='./resources/prj_imgs/banner/banner02.png' />
                    </a>
                </div>
                <div className="banner3">
                    <a href="#none" onClick={()=>banner1ClickHandler(3)}>
                        <img src='./resources/prj_imgs/banner/banner03.png' />
                    </a>
                </div>
                {
                    isOpenImg
                    ?
                    //big_banner_wrap를 클릭하면 이미지가 닫힘
                    <div className="big_banner_wrap" onClick={closeBtnClickHandler}>
                        <div className="banner">
                            <img src={`/resources/prj_imgs/banner/big_banner0${bannerNo}.png`} />
                        </div>
                    </div>
                    :
                    <></>    
                }
            </div>
        </>
    );
}

export default Banner;