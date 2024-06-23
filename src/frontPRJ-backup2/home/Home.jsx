import React from "react";

import Carousel from  "./Carousel";
import Local from "./Local";
import Theme from "./Theme";
import Banner from "./Banner";
import Footer from "./Footer";
const Home = () => {
    return(
        <>
        <Carousel />
        <Local />
        <Banner />
        <Theme />
        <Footer />
        </>
    );
};

export default Home;