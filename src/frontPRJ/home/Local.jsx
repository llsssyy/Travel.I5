import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/Local.css";
import Modal from "./Modal"


const Local = () => {

    // hook

    const [showModal, setShowModal] = useState(false);      // 모달창을 보이게, 안 보이게 하는 hook
    const [TextNo, setTextNo] = useState("");               // 각 아이템의 id값을 TextNo로 지정하였음.
    const [showLocal, setShowLocal] = useState("");         // 지역 범례 클릭 시 선택 지역에 해당하는 여행지만 보임.

    const [currentSlide, setCurrentSlide] = useState(0);    // 캐러셀 라이브러리 도트 관련 설정항목


    // 지역데이터DB 시작

    const localData = () => {

        let localDBInStorage = localStorage.getItem('localDB');
        let localObj = JSON.parse(localDBInStorage);
        let dummyLocalDB = localObj;

        dummyLocalDB = {
            ["seoul_01"]: {
                local: "seoul_01",
                title: "마포 문화비축기지",
                localName: "서울특별시 마포구",
                info: "반려동물과 함께 거닐어보는 친환경과 재생의 아이콘. \n\
                마포문화비축기지는 41년간 석유비축기지로 사용된 산업화시대 유산을 복합 문화 공간으로 탈바꿈한 장소이다. \n\
                기존의 5개의 탱크는 공연장, 전시장, 다목적 파빌리온으로 재생하고 신축 탱크 1개는 정보교류센터로, \n\
                임시주차장이었던 넓은 야외 공간은 문화마당으로 재탄생하여 시민들의 휴식과 다양한 커뮤니티 활동이 가능한 공간으로 조성되었다."
            },

            ["seoul_02"]: {
                local: "seoul_02",
                title: "예술의전당 한가람미술관",
                localName: "서울특별시 서초구",
                info: "예술의 풍경을 담는 전시공간. \n\
                1990년에 문을 연 한가람미술관은 조형예술 전시를 위한 최적의 공간이다. \n\
                2003년에 리노베이션을 거쳐 최신의 설비로 재탄생 하였다. 지하 1층 지상 3층 건물에 7개의 전시장과 수장고를 가지고 있으며, \n\
                자연채광에 가까운 광천정 시스템으로 편안한 관람 분위기를 조성한다. 매년 50여 건이 넘는 전시행사가 개최되고 있으며 \n\
                그 내용은 고대 문명을 소개하는 전시회부터 현대 미술까지 아우르고 있다. 예술의전당이 기획하여 주최한 주요 전시는 반 아파르트헤이트전, \n\
                유럽공동체 신진 작가전, 칸딘스키와 아방가르드전, 고대 이집트 문명전, 고대 메소포타미아 문명전, 렘브란트 판화전, 밀레와 바르비종파 거장전, \n\
                오르세 미술관 한국 특별전, 프랑스 국립 베르사유 특별전, 스키타이 황금문명전, 구사마 야요이전, 페르난도 보테로전, 니키 드 생팔전 등이 있다."
            },

            ["incheon"]: {
                local: "incheon",
                title: "송도 한옥마을",
                localName: "인천 연수구",
                info: "가장 현대적인 도시속 전통적인 한옥을 즐길 수 있는 곳. \n\
                인천 연수구 송도동 24-9번지에 조성된 한옥마을로 오래된 전통 가옥 촌이 아닌 2013년에 신축된 한옥 단지이다 \n\
                송도 국제도시의 고층빌딩과 한옥단지가 대비되면서 서양과 동양의 만남이 이루어지는 듯한 공간이 조성되었다. \n\
                조성 초기 계획으로는 전통문화 체험공간의 성격이 강했다고 전해지나 현재는 한옥 전통마을 전체 부지를 외식업체에 임대해 \n\
                한옥으로 지어진 호텔과 식당과 카페 등의 상업 시설로 이용되고 있다. \n\
                드라마 < 도깨비 >, < 야왕 >, <파랑새의 집> 촬영지로도 알려져 많은 사람이 찾는 장소이다."
            },


            ["daejeon"]: {
                local: "daejeon",
                title: "봉명동 우산거리",
                localName: "대전 유성구",
                info: "봉명동 우산 거리는 대전시 유성구 봉명동에 자리 잡고 있다. 거리 초입에 들어서면 건물 사이 공중에 형형색색의 우산이 설치되어 있으며 \n\
                거리에는 음식점과 술집 등 각종 요식업체가 성업 중이다. 우산 거리는 유성 IC에서 가까운 거리에 있는 대전의 핫플레이스다. \n\
                주변에는 유성온천을 비롯해 대전엑스포시민공원, 한밭수목원 등의 관광지가 있다."
            },

            ["daegu"]: {
                local: "daegu",
                title: "혜원의 집 (영화 리틀포레스트 촬영지)",
                localName: "대구 군위군",
                info: "시골 감성이 주는 힐링을 몸소 느끼다. \n\
                혜원의 집은 2018년에 개봉해 150만 관객을 모았던 영화 <리틀 포레스트>에서 주인공 혜원(배우 김태리)의 집이다. \n\
                이곳은 군위군의 대표적인 여행지 중 한 곳이다. 마을 입구에 주차를 하고 시골의 정취를 느끼며 조금 걸으면 혜원의 집을 볼 수 있다. \n\
                영화에서 느꼈던 감동을 그대로 느낄 수 있는 모습이다. 당시 사용했던 소품들이 곳곳에 남겨져 있고, \n\
                영화 속 주인공 혜원이 타던 자전거를 직접 타볼 수 있는 체험을 할 수 있다. 복잡한 도시 생활에 지친 사람들을 위한 힐링 명소이다."
            },

            ["gyeonggi"]: {
                local: "gyeonggi",
                title: "수종사",
                localName: "경기 남양주시",
                info: "높은 곳에서 두물머리를 바라 볼 수 있는 사찰. \n\
                수종사는 남양주 조안면 송촌리 운길산의 정상 부근에 있는 봉선사의 말사이다.  \n\
                이 절은 일찍이 서거정이 동방 사찰 중 제일의 전망이라고 격찬한 명당으로 북한강과 남한강이 합류하는 양수리 풍경을 볼 수 있으며 \n\
                인근 산까지 조망이 가능하다. 수종사는 신라 시대에 처음 지어진 것으로 전해지나 자세한 연혁은 알 수 없으며, \n\
                조선 세조와 관련된 일화가 있다. 세조가 지병 치료를 위해 강원도에 다녀오다가 양수리에서 하룻밤을 보내던 중, \n\
                은은한 종소리가 들려오는 곳을 찾아가 보니 토굴 속에 18 나한상이 있고 바위틈에서 떨어지는 물방울이 종소리를 내더라는 것이다. \n\
                이에 세조가 18 나한을 봉안해 절을 짓고 [수종사]라는 이름을 붙였다는 전설이다. 그러나 사찰에 세조의 고모인 정의옹주의 부도가 남아있는 것은 \n\
                그 이전에 이미 상당 규모의 절이었음을 알 수 있다. \n\
                정약용은 일생을 통해 수종사에서 지낸 즐거움을 [군자유삼락]에 비교할 만큼 좋아했던 곳이며, \n\
                다선(茶仙)으로 일컬어지는 초의선사가 정약용을 찾아와 한강의 아름다운 풍광을 즐기며 차를 마신 장소로, 차 문화와 깊은 인연이 있는 곳이다. \n\
                이에 수종사는 [삼정헌]이라는 다실을 지어 차 문화를 계승하고 있어 차 문화를 상징하는 사찰로 이름이 높다. \n\
                현존하는 당우로는 대웅보전, 응진전, 약사전, 산신각, 종각, 경학원, 요사 등이 있다. \n\
                중요문화재로는 보물로 지정된 [수종사부도내유물]과 경기도 유형문화재로 지정된 [수종사 오층석탑]이 있다. \n\
                사찰안에는 세조가 하사했다는 500년 수령의 아름드리 은행나무가 있다. 사계의 풍광이 모두 빼어나지만, \n\
                가을 단풍이 물드는 시기의 풍경이 특히 절경으로 알려져 있다. 수종사 주차장에서 절까지는 400m로 도보로 15분 정도 소요된다."
            },

            ["busan"]: {
                local: "busan",
                title: "다대포해수욕장",
                localName: "부산 사하구",
                info: "오랜 풍화작용으로 희고 부드러운 모래가 특징인 다대포해수욕장. \n\
                낙동강과 남해안이 만나 양질의 모래밭을 만든 곳, 일출과 일몰 조망지이다. \n\
                대포해수욕장은 자연이 주는 황홀경을 맘껏 즐길 수 있는 기분 좋은 장소이다. \n\
                다대포 해수욕장의 희고 고운 모래는 오랜 풍화작용 덕에 매우 부드러운 것이 특징이다. \n\
                또한 다대포해수욕장은 수심이 얕고 수온이 차지 않아 아이들이 놀기에 적격이다. \n\
                최근에는 패들보드나 카이트보딩 등 해양스포츠를 즐기는 사람들로 사시사철 활기가 넘치는 곳이다. \n\
                다대포해수욕장에 해변공원과 생태탐방로가 생기고 난 후 이곳을 찾는 사람들이 훨씬 많아졌다. \n\
                해수욕장 입구에 드넓은 광장이 펼쳐지고 세계 최대 규모를 자랑하는 꿈의 낙조 분수와 함께 해변공원이 시작된다. \n\
                꿈의 낙조분수는 화려한 조명과 음악이 춤을 추는 분수와 어우러져 장관을 연출한다. \n\
                4월 말부터 10월까지 정기적으로 펼쳐지는 화려한 분수쇼가 밤의 여행자를 기다리고 있다."
            },

            ["ulsan"]: {
                local: "ulsan",
                title: "당사해양낚시공원",
                localName: "울산 북구",
                info: "낚시를 좋아하는 사람이라면 한 번쯤 꼭 와봐야 할 곳. \n\
                낚시를 좋아하는 사람이라면 한 번쯤 꼭 와봐야 할 곳으로 유명한 당사해양낚시공원은 \n\
                동해의 멋지고 아름다운 바다를 보면서 산책하고 힐링하기 좋은 곳이다. \n\
                바다를 향해 길게 나 있는 긴 다리를 지나며 사랑의 조개 고리에 소원도 적어서 걸어보고, 벤치에서 풍경을 바라보며 쉬어도 보고, \n\
                시원한 바닷바람을 맞으면 걷다 보면 기분도 좋아진다. 철망으로 되어 있는 다리 아래로 파도를 직접 느낄 수 있어서 스릴도 즐길 수 있다. \n\
                바다 한가운데서 낚시도 해보고, 다리 끝 계단을 내려가 갯바위 위에 올라가면 울산 바다의 아름다움을 마음껏 감상할 수 있다. \n\
                노후된 시설을 보수하고 구조물도 추가하여 2023년 7월 멋진 모습으로 재개장을 하였다."
            },

            ["gwangju"]: {
                local: "gwangju",
                title: "김대중컨벤션센터",
                localName: "광주 서구",
                info: "국제 교류의 장으로서 지역 역량 강화를 위해 설립한 첨단전시공간. \n\
                광주광역시 서구 치평동에 있는 첨단전시 컨벤션센터로 2003년 광주전시컨벤션센터로 착공해 2005년 김대중컨벤션센터로 이름을 바꾼 뒤, \n\
                같은 해 9월 6일 문을 열었다. 국제 규모의 산업전시회·박람회·컨벤션(회의)·이벤트 개최 등을 통해 광주광역시를 \n\
                국내외 비즈니스의 중심지로 발전시켜 호남권 경제 활성화에 이바지하는 데 목적이 있다. \n\
                부지 면적은 1만 6123평, 연건평은 1만 1966평이다. 건물은 지하 1층 지상 4층 규모이다. \n\
                주요시설은 전시장·회의실과 옥내외 주차장, 편의시설 등이다. 전시장(3,085평)은 500개의 부스를 설치할 수 있고, \n\
                전시 규모에 따라 3개로 분할 사용할 수 있다. 컨벤션홀은 최대 2,000명을 동시에 수용할 수 있는 대회의실과 10개의 중소 회의실로 이루어져 있다. \n\
                또한 440대를 주차할 수 있는 주차 시설을 갖추고 있다. \n\
                주요사업은 국내외 박람회·전시회·회의·세미나 개최, 부동산 관리·운영 및 임대, 기계장비와 용구의 관리·임대, 무역 거래 알선, \n\
                국내외 전시정보 자료 조사 및 제공, 문화·광고·이벤트 서비스 공급 등이다. \n\
                개관 이후 2005년에만 국제광산업전시회, 광주정보통신전시회, 광주국제식품산업전, 광주디자인비엔날레 등 10건의 전시회를 유치하였다."
            },

            ["gangwon"]: {
                local: "gangwon",
                title: "화암동굴 (강원고생대 국가지질공원)",
                localName: "강원 정선군",
                info: "금광산과 석회석 자연동굴이 어우러진 세계 유일의 동굴. \n\
                화암동굴은 강원특별자치도 정선군 화암관광단지 내에 위치하고 있다. 과거 일제 강점기 금을 캤던 천포광산이며, \n\
                채광하던 중 지하에 있던 석회동굴이 발견되어 현재는 테마형 동굴 관광지로 변신했다. \n\
                화암동굴 내부에는 대형 유석, 석주, 종유석, 석화, 곡석, 동굴산호 등을 관찰할 수 있다. \n\
                총길이 1,803m로서 상부갱도 515m 구간에는 금광맥의 발견에서부터 금광석의 채취까지의 전 과정을 생생하게 시뮬레이션으로 재현하였다. \n\
                또한 화암동굴의 상징인 금깨비와 은깨비를 동굴 내 연출하여 어린이들도 흥미롭게 동굴을 탐험할 수 있도록 하였다."
            },
        }

        localObj = dummyLocalDB;
        localDBInStorage = JSON.stringify(localObj);
        localStorage.setItem('localDB', localDBInStorage);

        console.log('dummyLocalDB!! ', dummyLocalDB);


    }

    useEffect(() => {                                           // 사이트가 마운트 될때 localData 함수 실행

        localData();

    }, []);                                                     // 의미없이 반복되지 않게 빈 배열 넣어주었음

    // 지역데이터DB 끝

    // handler 시작



    // const modalBgClickHandler = () => {                     // 모달창 닫는 버튼 (close) 핸들러
    //     console.log("modalBgClickHandler CLICKED!!")

    //     setShowModal(false);
    // }


    const localClickHandler = (localNo) => {            // 지역 범례 버튼 클릭 핸들러
        console.log("localClickHandler() CALLED!!");

        switch (localNo) {                              // localClickHandler 함수 호출 부분에서 key값을 받음
            case "all":                                 // key값이 "all"일 경우
                setShowLocal("all");                    // "all"에 해당하는 아이템 출력
                break;
            case "seoul,gyeonggi,incheon":              // "seoul,gyeonggi,incheon"일 경우
                setShowLocal("seoul,gyeonggi,incheon"); // "seoul,gyeonggi,incheon"에 해당하는 아이템 출력
                break;
            case "gangwon-do":
                setShowLocal("gangwon-do");
                break;
            case "chungcheongnam-do":
                setShowLocal("chungcheongnam-do");
                break;
            case "gyeongsangbuk-do":
                setShowLocal("gyeongsangbuk-do");
                break;
            case "gyeongsangnam-do":
                setShowLocal("gyeongsangnam-do");
                break;
            case "jeollanam-do":
                setShowLocal("jeollanam-do");
                break;
        }

    }

    const localItemClickHandler = (localItemNo) => {       // 각 지역 아이템 클릭하면 모달창보이게, TextNo에 ID값을 할당하였음

        console.log("localItemClickHandler() CLICKED!!");

        switch (localItemNo) {
            case "seoul_01":
                setShowModal(true);
                setTextNo("seoul_01");
                break;
            case "seoul_02":
                setShowModal(true);
                setTextNo("seoul_02");
                break;
            case "incheon":
                setShowModal(true);
                setTextNo("incheon");
                break;
            case "daejeon":
                setShowModal(true);
                setTextNo("daejeon");
                break;
            case "daegu":
                setShowModal(true);
                setTextNo("daegu");
                break;
            case "gyeonggi":
                setShowModal(true);
                setTextNo("gyeonggi");
                break;
            case "busan":
                setShowModal(true);
                setTextNo("busan");
                break;
            case "ulsan":
                setShowModal(true);
                setTextNo("ulsan");
                break;
            case "gwangju":
                setShowModal(true);
                setTextNo("gwangju");
                break;
            case "gangwon":
                setShowModal(true);
                setTextNo("gangwon");
                break;
        }

    }

    // handler 끝


    // 캐러셀 설정 시작

    const settings = {
        dots: true, //슬라이드 아래 도트 표시 여부
        infinite: true, // 무한 루프로 슬라이드를 이어갈지 여부
        speed: 500, // 슬라이드 전환 속도
        slidesToShow: 3, //보여질 슬라이드 수 -> 이미지의 길이가 1보다 작으면 이미지 수만큼, 아니면 3개
        slidesToScroll: 1, // 한 번에 이동하는 스크롤 수
        // prevArrow: <div className="slick-prev"></div>, // 이전 화살표
        // nextArrow: <div className="slick-next"></div>, // 다음 화살표
        centerMode: true, //슬라이더의 중앙에 위치한 슬라이드를 크게 표시하는 기능을 제공
        centerPadding: '10px', //// 이미지 간격을 조절
        beforeChange: (current, next) => setCurrentSlide(next), //슬라이드 전환 전에 호출되는 콜백 함수. 현재 슬라이드와 다음 슬라이드의 인덱스를 받아서 처리 -> 라이브러리에서 제공하는 것
        autoplay: true, // 자동 재생 활성화
        autoplaySpeed: 2000, // 슬라이드 간의 시간 간격 (밀리초)

        // 이전 화살표 커스텀 요소
        prevArrow: <CustomPrevArrow />,

        // 다음 화살표 커스텀 요소
        nextArrow: <CustomNextArrow />,

        customPaging: function (i) { //도트 외형 정의
            return (
                <div
                    style={{
                        margin: '50px 0',
                        width: '10px', // 도트 너비
                        height: '10px', // 도트 높이
                        borderRadius: '50%',
                        border: '1px solid #788dad',
                        backgroundColor: i === currentSlide ? '#788dad' : '#fff', // 선택된 도트의 색상을 변경
                    }}
                ></div>
            );
        },
    };
    const sliderStyle = {
        //슬라이더를 수평 방향으로 가운데 정렬
        margin: '0 auto',
    };

    function blockWhileDragging(isDragging) {
        let slides = document.getElementsByClassName("slick-slide");
        
        if (isDragging) {
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.add("is-dragging"); // is-dragging 클래스 추가
             }
        } else {
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("is-dragging"); // is-dragging 클래스 제거
            }
        }
    }

    // mousedown 여부를 판단할 변수
let isMouseDown = false;

// mousedown 이벤트에서 isMouseDown을 true로 변환
document.addEventListener("mousedown", () => {
	isMouseDown = true;
});

// mousemove 이벤트에서 isMouseDown을 판단해 blockWhileDragging 함수 실행
document.addEventListener("mousemove", () => {
	if (isMouseDown) {
    	blockWhileDragging(true);
    } else {
    	blockWhileDragging(false);
    }
});

// mouseup 이벤트에서 mousedown 이전 상태로 초기화
document.addEventListener("mouseup", () => {
	isMouseDown = false;
    blockWhileDragging(false);
});


    // 캐러셀 설정 끝


    return (
        <div className="local_allwrap">
            <div className="local_wrap">

                {/* 지역별 추천 여행지 타이틀 */}
                <div className="title">
                    <p><img src="./resources/prj_imgs/local/left_quotation.png" /> 지역별 추천 여행지 <img src="./resources/prj_imgs/local/right_quotation.png" /></p>
                </div>


                {/* 지역 선택 버튼 */}
                <div className="local_select_bar">
                    <input type="button" id="div1" onClick={() => localClickHandler("all")} value="#전체" />
                    <input type="button" id="div1" onClick={() => localClickHandler("seoul,gyeonggi,incheon")} value="#수도권" />
                    <input type="button" id="div1" onClick={() => localClickHandler("gangwon-do")} value="#강원도" />
                    <input type="button" id="div1" onClick={() => localClickHandler("chungcheongnam-do")} value="#충청남도" />
                    <input type="button" id="div1" onClick={() => localClickHandler("gyeongsangbuk-do")} value="#경상북도" />
                    <input type="button" id="div1" onClick={() => localClickHandler("gyeongsangnam-do")} value="#경상남도" />
                    <input type="button" id="div1" onClick={() => localClickHandler("jeollanam-do")} value="#전라남도" />
                </div>


                {/* 지역별 아이템 - 기본값(선택 안했을 시) + 전체 버튼 */}

                {(showLocal === "" || showLocal === "all") &&
                    <Slider {...settings}>

                        <div className="local_item" id="seoul_01">
                            <a href="#none" onClick={() => localItemClickHandler("seoul_01")}>
                                <img className="local_seoul_01" src="./resources/prj_imgs/local/pic01.png" />
                                <div className="local_title"><span>마포 문화비축기지</span><br />서울특별시 마포구</div>
                            </a>
                        </div>

                        <div className="local_item" id="seoul_02">
                            <a href="#none" onClick={() => localItemClickHandler("seoul_02")}>
                                <img className="local_seoul_02" src="./resources/prj_imgs/local/pic02.png" />
                                <div className="local_title"><span>예술의전당 한가람미술관</span><br />서울특별시 서초구</div>
                            </a>
                        </div>

                        <div className="local_item" id="incheon">
                            <a href="#none" onClick={() => localItemClickHandler("incheon")}>
                                <img className="local_incheon" src="./resources/prj_imgs/local/pic03.png" />
                                <div className="local_title"><span>송도 한옥마을</span><br />인천 연수구</div>
                            </a>
                        </div>

                        <div className="local_item" id="daejeon">
                            <a href="#none" onClick={() => localItemClickHandler("daejeon")}>
                                <img className="local_daejeon" src="./resources/prj_imgs/local/pic04.png" />
                                <div className="local_title"><span>봉명동 우산거리</span><br />대전 유성구</div>
                            </a>
                        </div>

                        <div className="local_item" id="daegu">
                            <a href="#none" onClick={() => localItemClickHandler("daegu")}>
                                <img className="local_daegu" src="./resources/prj_imgs/local/pic05.png" />
                                <div className="local_title"><span>혜원의 집 (영화 리틀포레스트 촬영지)</span><br />대구 군위군</div>
                            </a>
                        </div>

                        <div className="local_item" id="gyeonggi">
                            <a href="#none" onClick={() => localItemClickHandler("gyeonggi")}>
                                <img className="local_gyeonggi" src="./resources/prj_imgs/local/pic06.png" />
                                <div className="local_title"><span>수종사</span><br />경기 남양주시</div>
                            </a>
                        </div>

                        <div className="local_item" id="busan">
                            <a href="#none" onClick={() => localItemClickHandler("busan")}>
                                <img className="local_busan" src="./resources/prj_imgs/local/pic07.png" />
                                <div className="local_title"><span>다대포해수욕장</span><br />부산 사하구</div>
                            </a>
                        </div>

                        <div className="local_item" id="ulsan">
                            <a href="#none" onClick={() => localItemClickHandler("ulsan")}>
                                <img className="local_ulsan" src="./resources/prj_imgs/local/pic08.png" />
                                <div className="local_title"><span>당사해양낚시공원</span><br />울산 북구</div>
                            </a>
                        </div>

                        <div className="local_item" id="gwangju">
                            <a href="#none" onClick={() => localItemClickHandler("gwangju")}>
                                <img className="local_gwangju" src="./resources/prj_imgs/local/pic09.png" />
                                <div className="local_title"><span>김대중컨벤션센터</span><br />광주 서구</div>
                            </a>
                        </div>

                        <div className="local_item" id="gangwon">
                            <a href="#none" onClick={() => localItemClickHandler("gangwon")}>
                                <img className="local_gangwon" src="./resources/prj_imgs/local/pic010.png" />
                                <div className="local_title"><span>화암동굴 (강원고생대 국가지질공원)</span><br />강원 정선군</div>
                            </a>
                        </div>

                    </Slider>
                }

                {/* 지역별 아이템 - (수도권 버튼) */}

                {showLocal === "seoul,gyeonggi,incheon" && (
                    <Slider {...settings}>

                        <div className="local_item" id="seoul_01">
                            <a href="#none" onClick={() => localItemClickHandler("seoul_01")}>
                                <img className="local_seoul_01" src="./resources/prj_imgs/local/pic01.png" />
                                <div className="local_title"><span>마포 문화비축기지</span><br />서울특별시 마포구</div>
                            </a>
                        </div>

                        <div className="local_item" id="seoul_02">
                            <a href="#none" onClick={() => localItemClickHandler("seoul_02")}>
                                <img className="local_seoul_02" src="./resources/prj_imgs/local/pic02.png" />
                                <div className="local_title"><span>예술의전당 한가람미술관</span><br />서울특별시 서초구</div>
                            </a>
                        </div>

                        <div className="local_item" id="incheon">
                            <a href="#none" onClick={() => localItemClickHandler("incheon")}>
                                <img className="local_incheon" src="./resources/prj_imgs/local/pic03.png" />
                                <div className="local_title"><span>송도 한옥마을</span><br />인천 연수구</div>
                            </a>
                        </div>

                        <div className="local_item" id="gyeonggi">
                            <a href="#none" onClick={() => localItemClickHandler("gyeonggi")}>
                                <img className="local_gyeonggi" src="./resources/prj_imgs/local/pic06.png" />
                                <div className="local_title"><span>수종사</span><br />경기 남양주시</div>
                            </a>
                        </div>
                    </Slider>
                )}

                {/* 지역별 아이템 - (강원도 버튼) */}

                {showLocal === "gangwon-do" && (
                    <div className="local_item" id="gangwon">
                        <a href="#none" onClick={() => localItemClickHandler("gangwon")}>
                            <img className="local_gangwon" src="./resources/prj_imgs/local/pic010.png" />
                            <div className="local_title">
                                <span>화암동굴 (강원고생대 국가지질공원)</span><br />강원 정선군</div>
                        </a>
                    </div>
                )}

                {/* 지역별 아이템 - (충청남도 버튼) */}

                {showLocal === "chungcheongnam-do" && (
                    <div className="local_item" id="daejeon">
                        <a href="#none" onClick={() => localItemClickHandler("daejeon")}>
                            <img className="local_daejeon" src="./resources/prj_imgs/local/pic04.png" />
                            <div className="local_title"><span>봉명동 우산거리</span><br />대전 유성구</div>
                        </a>
                    </div>
                )}

                {/* 지역별 아이템 - (경상북도 버튼) */}

                {showLocal === "gyeongsangbuk-do" && (
                    <div className="local_item" id="daegu">
                        <a href="#none" onClick={() => localItemClickHandler("daegu")}>
                            <img className="local_daegu" src="./resources/prj_imgs/local/pic05.png" />
                            <div className="local_title"><span>혜원의 집 (영화 리틀포레스트 촬영지)</span><br />대구 군위군</div>
                        </a>
                    </div>
                )}

                {/* 지역별 아이템 - (경상남도 버튼) */}

                {showLocal === "gyeongsangnam-do" && (
                    <>
                        <div className="local_item" id="busan">
                            <a href="#none" onClick={() => localItemClickHandler("busan")}>
                                <img className="local_busan" src="./resources/prj_imgs/local/pic07.png" />
                                <div className="local_title"><span>다대포해수욕장</span><br />부산 사하구</div>
                            </a>
                        </div>

                        <div className="local_item" id="ulsan">
                            <a href="#none" onClick={() => localItemClickHandler("ulsan")}>
                                <img className="local_ulsan" src="./resources/prj_imgs/local/pic08.png" />
                                <div className="local_title"><span>당사해양낚시공원</span><br />울산 북구</div>
                            </a>
                        </div>
                    </>
                )}

                {/* 지역별 아이템 - (전라남도 버튼) */}

                {showLocal === "jeollanam-do" && (
                    <div className="local_item" id="gwangju">
                        <a href="#none" onClick={() => localItemClickHandler("gwangju")}>
                            <img className="local_gwangju" src="./resources/prj_imgs/local/pic09.png" />
                            <div className="local_title"><span>김대중컨벤션센터</span><br />광주 서구</div>
                        </a>
                    </div>
                )}

                {/* 모달창 시작 */}

                {
                    showModal
                        ?
                        <Modal keyValue={TextNo} modalViewer={setShowModal} />
                        :
                        null
                }

                {/* 모달창 끝 */}

            </div>
        </div>

    );
};

const CustomPrevArrow = (props) => {        // 캐러셀 화살표 커스텀부분(좌)
    const { onClick } = props;
    return (
        <img src="./resources/prj_imgs/local/left_arrow.png" id="leftArw" onClick={onClick} />
    );
};


const CustomNextArrow = (props) => {        // 캐러셀 화살표 커스텀부분(우)
    const { onClick } = props;
    return (
        <img src="./resources/prj_imgs/local/right_arrow.png" id="rightArw" onClick={onClick} />
    );
};

export default Local;