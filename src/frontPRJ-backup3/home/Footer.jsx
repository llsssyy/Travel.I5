import React, { useEffect, useState } from "react";
import "../css/footer.css";

const Footer = () => {

    // handler

    const [showButton, setShowButton] = useState(false);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 300) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }


        window.addEventListener("scroll", handleShowButton)
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])

    return (
        <div id="footer">
            <div className="links">
                <a href="#none">회사소개</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#none">이용약관</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#none">개인정보처리방침</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#none">마케팅제휴</a>
            </div>
            <div className="info">
                <div className="logo"><img src="./resources/prj_imgs/local/i5.png" /></div>
                대표 : 김명호
                &nbsp;&nbsp;|&nbsp;&nbsp;
                주소 : 경기도 의정부시 의정부동
                <br />
                <span>COPYRIGHTⓒ Travel.I5 SERVICE INC. ALL RIGHTS RESERVED</span>
            </div>
            <div className="CS">
                <div className="CS1"><img src="./resources/prj_imgs/local/cs1.png" /><span> 고객센터 : 02-500-5000</span></div>
                <div className="CS2"><img src="./resources/prj_imgs/local/cs2.png" /><span> &nbsp;E-MAIL : admin@travel.i5</span></div>
            </div>
            {
                showButton && (
                    <div className="top_btn">
                        <img onClick={scrollToTop} src="./resources/prj_imgs/local/top.png" />
                    </div>)
            }
        </div>
    );
}

export default Footer;