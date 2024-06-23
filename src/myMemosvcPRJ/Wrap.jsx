import React from "react";
import Banner from './Banner';
import Menubar from "./Menubar";
import './index.css';

const Wrap = () => {
    return (
        <div id="wrap">
        <p>MY MEMO SERVICE</p>
        <Banner />
        <Menubar />
        </div>
    )

}

export default Wrap;