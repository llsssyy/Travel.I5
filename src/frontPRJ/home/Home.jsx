import React from "react";

import Carousel from  "./Carousel";
import Local from "./Local";
import Theme from "./Theme";
import Banner from "./Banner";
import Footer from "./Footer";
const Home = (props) => {
    return(
        <>
        <Carousel menuViewer={props.menuViewer}/>
        <Local />
        <Banner />
        <Theme />
        <Footer />
        </>
    );
};

export default Home;