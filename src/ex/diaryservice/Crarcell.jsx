import React, { useState } from "react";


let intervalID;
let picNames = ['pic01', 'pic02', 'pic03', 'pic04', 'pic05'];

const Crarcell = () => {

    // Hook
    const [isStop, setIsStop] = useState(true);
    const [currentIdx, setCurrentIdx] = useState(0);

    // event Handler
    const playBtnClickHandler = () => {
        console.log('Play Btn CLICKED!!');
        
        setIsStop(false);
        intervalID = setInterval(changePic, 1000);

    }

    const stopBtnClickHandler = () => {
        console.log('Stop Btn CLICKED!!');

        setIsStop(true);
        clearInterval(intervalID);

    }

    // function

    const changePic = () => {
        console.log('changePic() CALLED!!');

        setCurrentIdx((pv) => {
            pv++;
            if (pv >= picNames.length) pv = 0;
            return pv;
        });

    }



    return (
        <div id="wrap">
            <div className="pic_wrap">
                <img src={`./resorces/imgs/${picNames[currentIdx]}.jpg`}></img>
            </div>

            <div className="btns">
                {
                    isStop
                        ?
                        <button onClick={playBtnClickHandler}>PLAY</button>
                        :
                        <button onClick={stopBtnClickHandler}>STOP</button>
                }


            </div>
        </div>
    )
}

export default Crarcell;