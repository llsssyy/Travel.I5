import React from "react";
import Carousel from "./Carousel";
import Menubar from "./Menubar";

const Wrap = () => {
    return (
        <>
        <div id="wrap" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.3em', padding: '10px', margin: '15px'}}>
        My Memo Service Site
        </div>
        <Carousel />
        <Menubar />
        </>
    )
}

export default Wrap;