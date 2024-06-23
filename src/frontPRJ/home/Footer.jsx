import React, { useEffect, useState } from "react";
import "../css/footer.css";

const Footer = () => {

    // handler

    const [showButton, setShowButton] = useState(false);    // top버튼이 보이게/안보이게 하는 useState
    const [showInfo, setShowInfo] = useState(false);
    const [InfoPic, setInfoPic] = useState(0);




    useEffect(() => {                                       // 페이지가 마운트 됐을때 실행됨.
        const handleShowButton = () => {                    
            if (window.scrollY > 300) {                     // 웹페이지 창에서 스크롤을 300px 초과하게 내렸을 시
                setShowButton(true)                         // top버튼이 보이고
            } else {                                        // 아니면
                setShowButton(false)                        // 안보임
            }
        }


        window.addEventListener("scroll", handleShowButton) // 윈도우창에서 스크롤 할 시, handleShowButton 이벤트 발생
        return () => {
            window.removeEventListener("scroll", handleShowButton)
        }
    }, [])



    // function


    const scrollToTop = () => {                             // top버튼 클릭 시 화면 위쪽으로 스크롤 되게하는 함수
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    };

    const linksClickHandler = (infoNo) => {
        console.log('linksClickHandler() CALLED!!');

        setShowInfo(true);

        switch (infoNo) {
            case "info1" :
                setShowInfo(true);
                setInfoPic(1);
            break;
            case "info2" :
                setShowInfo(true);
                setInfoPic(2);
            break;
            case "info3" :
                setShowInfo(true);
                setInfoPic(3);
            break;
            case "info4" :
                setShowInfo(true);
                setInfoPic(4);
            break;
        }
    }

    const modalBgClickHandler = () => {
        console.log('modalBgClickHandler() CALLED!!');

        setShowInfo(false);
    }

    
    return (
        <div id="footer">
            <div className="links">
                <a href="#none" onClick={() => linksClickHandler("info1")}>회사소개</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#none" onClick={() => linksClickHandler("info2")}>이용약관</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#none" onClick={() => linksClickHandler("info3")}>개인정보처리방침</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="#none" onClick={() => linksClickHandler("info4")}>마케팅제휴</a>
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
            {
                showInfo
                ?
                <>
                <div className="info_bg" onClick={modalBgClickHandler}>
                    <div className="info">
                    <img src={`./resources/prj_imgs/local/info${InfoPic}.png`} />
                    </div>
                    <div className="close" onClick={modalBgClickHandler}></div>
                </div>
                </>
                :
                null
            }
        </div>
    );
}

export default Footer;