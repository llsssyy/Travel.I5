import React, { useState } from "react";


let IntervalID;
let picNo = ['pic01', 'pic02', 'pic03', 'pic04', 'pic05']


const Banner = () => {

    // hook

    const [isStop, setIsStop] = useState(true);
    const [currentIdx, setCurrentIdx] = useState(0);

    // handler

    const playBtnClickHandler = () => {
        console.log('[Banner] playBtnClickHandler()');

        setIsStop(false);

        IntervalID = setInterval(changepic, 1000);


    }

    const stopBtnClickHandler = () => {
        console.log('[Banner] stopBtnClickHandler()');

        setIsStop(true);

        clearInterval(IntervalID);
    }


    // function

    let changepic = (pv) => {
        console.log('[Banner] changepic()')

        setCurrentIdx((pv) => {
            pv++
            if (pv >= picNo.length) pv = 0;
            
            return pv;
            
        })
    }


 

    return (
        <div className="banner">
            <img src={`./resorces/imgs/${picNo[currentIdx]}.jpg`} />
            <br />
            {
                isStop
                    ?
                    <button onClick={playBtnClickHandler}>PLAY</button>
                    :
                    <button onClick={stopBtnClickHandler}>STOP</button>
            }
        </div>
    )

}

export default Banner;