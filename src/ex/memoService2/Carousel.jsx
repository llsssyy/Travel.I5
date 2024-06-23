import React, { useState } from "react";

let IntervalID;
let picNo = ['pic01','pic02','pic03','pic04','pic05']

const Carousel = () => {

    // hook
    
    const [isStop, setIsStop] = useState(true);
    const [currentIdx, setCurrentIdx] = useState(0);


    // handler

    const playBtnClickHandler = () => {
        console.log('[Carousel] playBtnClickHandler()');

        setIsStop(false);
        IntervalID=setInterval(changePic, 1000);

    }

    const stopBtnClickHandler = () => {
        console.log('[Carousel] stopBtnClickHandler()');

        setIsStop(true);

        clearInterval(IntervalID);

    }

    // function

    const changePic = () => {
        console.log('[Carousel] changePic()');

        setCurrentIdx((pv) => {
            pv++
            if (pv >= picNo.length) pv=0;

            return pv;
        });

    }



    return (
        <div className="carousel_wrap">
            <img src={`./resorces/imgs/${picNo[currentIdx]}.jpg`} />
            <br />
            {
                isStop
                    ?
                    <input type="button" onClick={playBtnClickHandler} value="PLAY" />
                    :
                    <input type="button" onClick={stopBtnClickHandler} value="STOP" />
            }
        </div>
    );
}

export default Carousel;