import React from "react";
import Menubar from "./Menubar";

import './style/common.css';
import './style/wrap.css';
import Carousel from "./Carousel";

const Wrap = () => {

    return(
        <div id="wrap">
            <div style={{textAlign: 'center', fontWeight: 'bold', fontSize: '1.3em', padding: '10px', margin: '15px'}}>
                My memo service
            </div>
            <Carousel />
            <Menubar />
        </div>
    );
}
export default Wrap;