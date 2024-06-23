import { useEffect, useState } from "react";
import '../css/theme.css';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from "./Modal"

const Theme = () => {
   //이미지 리스트
   const imageList = [
    {id:1,  category: 'snow',     src: './resources/prj_imgs/theme/ex/1.png',  dummyThemeDBItme: 'snow',  content: '무주 \'덕유산 국립 공원\''},
    {id:2,  category: 'snow',     src: './resources/prj_imgs/theme/ex/2.png',  dummyThemeDBItme: 'drive', content: '정선 \'만항제\''}, 
    {id:3,  category: 'forest',   src: './resources/prj_imgs/theme/ex/3.png',  dummyThemeDBItme: 'forest', content: '원대리 자작나무 숲'},
    {id:4,  category: 'activity', src: './resources/prj_imgs/theme/ex/4.png',  dummyThemeDBItme: 'waterpark', content: '설악 워터피아'},
    {id:5,  category: 'snow',     src: './resources/prj_imgs/theme/ex/5.png',  dummyThemeDBItme: 'holyPlace', content: '당진 신리성지'},
    {id:6,  category: 'forest',   src: './resources/prj_imgs/theme/ex/6.png',  dummyThemeDBItme: 'garosuGil', content: '메타세콰이어길'},
    {id:7,  category: 'beach',    src: './resources/prj_imgs/theme/ex/7.png',  dummyThemeDBItme: 'beach', content: '서춘 춘장대 해수욕장'},
    {id:8,  category: 'forest',   src: './resources/prj_imgs/theme/ex/8.png',  dummyThemeDBItme: 'intersection', content: '옥녀 교차로'},
    {id:9,  category: 'beach',    src: './resources/prj_imgs/theme/ex/9.png',  dummyThemeDBItme: 'haseulla', content: '하슬라'},
    {id:10, category: 'activity', src: './resources/prj_imgs/theme/ex/10.png', dummyThemeDBItme: 'activity', content: '평창 \'용평 리조트 스키장\''},
    {id:11, category: 'beach',    src: './resources/prj_imgs/theme/ex/11.png', dummyThemeDBItme: 'sogcho', content: '속초 영금정'},
    {id:12, category: 'activity', src: './resources/prj_imgs/theme/ex/12.png', dummyThemeDBItme: 'alpeuseu', content: '알프스 마을'},
];

    //hook
    const [isModalOpen, setIsModalOpen] = useState(false); //modal
    const [modalData, setModalData] = useState('');

    //도트
    const [currentSlide, setCurrentSlide] = useState(0);

    //category
    const [selectedCategory, setSelectedCategory] = useState('all');

    //dummy data
    const themeData = () => {
        let themeDBInStorage = localStorage.getItem('themeDB');
        let themeObj = JSON.parse(themeDBInStorage);
        let dummyThemeDB = themeObj;
        
        dummyThemeDB = {
            ["snow"] : { //키값
                theme: "snow", //영문 테마명
                title: "아름다운 눈꽃 산행지",
                localName: "전북 무주군", //한글 테마명
                info: "무주 '덕유산 국립 공원'"  //테마 정보
                    + " 국내에서 네 번째로 높은 산. 겨울이면 새하얀 눈으로 뒤덮여 장관을 이룬다." 
                    + " 정상까지 오르지 않고도 겨울 왕국과 마주할 수 있다는 점이 가장 큰 매력 포인트."
                    + " 곤돌라를 타고 설천봉까지 이동해 '상제루'를 배경으로 인증샷을 남겨보자. 정자 외벽부터"
                    + " 기와 지붕까지 눈이 내려앉아 존재감을 뽐낸다."
            },
            ["drive"]: {
                theme: "drive",
                title: "눈꽃 드라이브 성지",
                localName: "강원도 정선",
                info: "정선 '만항제'"
                    + "우리나라에서 자동차로 오를 수 있는 가장 높은 고갯길. 겨울이면 울창한 숲에 엄청난 눈이 쌓이며"
                    + " 비현실적인 분위기를 자아낸다. 특히 눈꽃이 필 때 쯤은 사진작가들이 사랑하는 겨울 출사지로 명성이 자자하다."
                    + " 최근에는 '운탄고도 백패킹' 명소로도 입소문을 타는 중. 내리막길에서는 썰매를 타는 게 묘미니, 썰매를 챙겨가는 것을 추천한다."
            },
            ["forest"]: {
                theme: "forest",
                title: "은빛 찬란한 자작나무",
                localName: "강원도 인제군",
                info: "원대리에 위치한 자작나무 숲이다. 한국인이 꼭 가봐야할 '한국 관광 100선'에 선정된 곳으로, 우리나라 자작나무숲 중 최고라 해도 손색이 없다." 
                    + " 탐방로는 총 7개 코스로 조성되어 있으며, 입구에서부터 한 시간 남짓 걸어야지만 자작나무숲을 만날 수 있다. 아이젠이 없으면 조금은" 
                    + " 힘들 수도. 깜빡 잊었거나 눈길이 미끄럽다면, 아래쪽에서 아이젠을 판매하고 있으니 참고하자. 올라가는 길은 쉽지 않지만, 머지않아 마주한 풍경은" 
                    + " 겨울 그 자체다. 약 70만 그루가 심어져 있어 이름처럼 숲을 이루고 있다. 20m는 훌쩍 넘는 길이로 하늘을 향해 뻗어있는 모습이 이국적이기도 하다." 
                    + " 원래는 소나무 숲이었다는 게 믿기지 않을 정도다. 자작나무의 껍질은 하얗고 부드러우며 윤기가 난다. 그로 인해 일년 내내 신비로운 자태를 뽐내지만, 하얀"
                    + " 눈 내리는 겨울에 더욱 빛을 발하는 이유다. SNS에서 유명한 포토스팟에서 사진도 찍고, 걷다가 쉬다가 하며 여유로운 보내자. 눈이 내지지 않는 날이라도,"
                    + " 눈 소식이 없더라도 속상해하지 말자. 참고로 눈이 조금이라도 오면 탐방로의 일부가 제한된다고 하니 이점 유의하자."
                    + " 겨울왕국에 햇살이 더해지니 눈부시게 반짝인다. 자연과 계절이 주는 아름다움을 가득 느끼며 힐링 시간을 보내보자."
            },
            ["waterpark"]: {
                theme: "waterpark",
                title: "국내 최초이자 최대 온천 워터파크",
                localName: "강원도 속초시",
                info: "스파부터 다양한 어트랙션을 즐길 수 있어 겨울철에도 발길이 끊이질 않는 곳이다. 설악워터피아의 가장 큰 매력은 설악산 경치와 함께 할 수 있는" 
                    + " 노천온천이 아닐까. 이곳의 온천수는 지하 680미터 지점에서 하루 3천 톤씩 용출되는 천연 온천수라고 한다. 아름다운 자연을 바라보며 즐기는 스파. 더할 나위 없다." 
                    + " 설악워터피아 곳곳에서 신나는 어트랙션도 만나볼 수 있다. 다채로운 시설이 마련되어 있어 발견하는 재미가 있는 곳이다. 아이부터 어른까지" 
                    + " 온 가족이 즐길 수 있어 겨울 가족여행으로 모자람이 없다. 특히 설악워터피아의 시그니처인 메일스트롬은 꼭 한 번 타보길 추천한다." 
                    + " 깔대기 모양의 원통을 지그재그로 회전하다가 17m 높이에서 급하강할 땐 짜릿한 기분을 느낄 수 있을 것이다. 입장 시 제공하는 방수 마스크를" 
                    + " 착용해야 이용이 가능하며 허기를 달래주는 푸드코트도 마련되어 있으니 참고할 것. 움츠러든 몸과 마음을 모두 설악워터피아에서 풀어보자."
            },
            ["holyPlace"]: {
                theme: "holyPlace",
                title: "천주교의 대표적인 성지 중 하나",
                localName: "충남 당진시",
                info: "당진 신리성지는 조선교구장 다블뤼 주교가 병인박해로 순교하기 전 21년의 시간을 보낸 곳으로, 조선교구의 발상지이다. 천주교 순교의 성지로서의 의미가 큰 곳이다."
                    + " 당진 신리성지는 천주교 신자뿐만 아니라 관광객들도 자주 찾는 당진의 대표적인 명소 중 한 곳이다. 특히 겨울에는 하얗게 쌓인 눈과 함께 성지의 건물들이 조화되는" 
                    + " 아름다운 풍경을 만날 수 있다. 신리성지의 설경을 감상하기 가장 좋은 시간은 아침 시간이다. 아침에는 방문객이 적어 더욱 한적하게 성지를 돌아볼 수 있으며, 온통 새하얀" 
                    + " 눈 세상을 감상할 수 있다. 성지 주변으로 가는 길은 미끄러울 수 있으니 주의해야 한다. 역사적 의미와 함께 멋진 풍경까지 만날 수 있는 당진 신리성지." 
                    + " 당진에 왔다면 꼭 한번 방문해 보는 것을 추천한다." 
            },
            ["garosuGil"]: {
                theme: "garosuGil",
                title: "메타세콰이어길",
                localName: "전남 담양군",
                info: "예산군 덕산면 시량리에 위치한 메타세콰이어 가로수길. 450m의 메타세콰이어길이 도로 양옆으로 늘어서 있는데, 겨울이면 하얀 눈이 소복하게 쌓여 색다른 분위기를 자랑한다."
                    + " 가로수길은 덕산 온천지구 인근에 위치하고 있다는 것도 장점이다. 가로수길은 덕산 스플라스 리솜, 덕산 온천 족욕장에서 도보 15-20분정도 소요되는 거리에 있다." 
                    + " 덕산 나들이 계획이 있다면 함께 방문해 보는 것도 추천한다." 
            },
            ["beach"]: {
                theme: "beach",
                title: "멋진 일몰 풍경과 함께",
                localName: "충남 서천군",
                info: "멋진 일몰 풍경과 함께 해변 위에 소복히 쌓인 눈을 감상하고 싶다면 서춘 춘장대 해수욕장을 추천한다. 서춘 춘장대 해수욕장은 백사장 길이가 2km에 달하는" 
                    + " 넓은 해변을 가지고 있다. 해수욕장이 개장하는 여름 시즌에 가장 인기 있지만, 겨울에도 의외로 멋진 풍경을 감상할 수 있다. 서해안이라 일몰을 감상하기 가장" 
                    + " 적합하다는 점도 장점이다. 눈이 많이 온 다음 날에는 해변 위로 하얀 눈이 쌓이는데, 한적한 겨울 바다를 산책하기 더없이 좋다." 
                    + " 해송, 바다, 눈, 일몰 4박자가 오묘한 궁합을 자랑하는 서춘 춘장대 해수욕장. 지금까지 만나본 국내 겨울 바다의 풍경 중 제일이라고" 
                    + " 할 정도로 황홀한 겨울 풍경을 만날 수 있는 곳이다. 겨울의 또 다른 묘미는 바로 동백꽃이다. 인근에 마량리 동백나무 숲이 있어 겨울에 피는 꽃 동백꽃도 함께 즐겨보는 것도 추천한다." 
            },
            ["intersection"]: {
                theme: "intersection",
                title: "전북 군산시 해망로와 해망로 3길이 만나는",
                localName: "전북 군산시",
                info: "군산 옥녀 교차로는 전라북도 군산시 해망로와 해망로3길이 만나는 교차로다. 원래는 평범한 교차로였으나, 메타세콰이어 군락지가 독특한 풍경을 자아내어 SNS 포토스팟으로 인기가 많아졌다." 
                    + " 봄과 여름에는 청보리밭이 메타세콰이어나무를 둘러싸고 있고, 겨울에는 소복이 쌓인 눈이 있어 더욱 이국적인 풍경을 만날 수 있다." 
                    + " 다만 관광지가 아닌 만큼 주차장이 없기 때문에 근처 공영주차장에 주차하고 걸어오는 것을 추천한다." 
                    + " 날씨에 따라 장소의 분위기가 달라진다. 흐리면 흐린 대로 분위기 있기 때문에, 겨울의 이국적인 풍경을 보고 싶다면 군산 옥녀 교차로를 추천한다." 
            },
            ["haseulla"]: {
                theme: "haseulla",
                title: "강릉의 옛 이름, 하슬라",
                localName: "강원도 강릉시",
                info: "어째선지 바닷가의 대형 카페가 연상되는 이름 하슬라. 하슬라는 강릉의 옛 이름이라고 한다. 동해 바다 앞에 위치한 강릉 하슬라아트월드에서는" 
                    + " 다양한 장르의 예술 작품을 감상할 수 있다. 강릉 하슬라아트월드는 실내와 야외에서 다채로운 미술 세계를 즐길 수 있다." 
                    + " 실내에는 총 세 관의 현대 미술관과 피노키오관이 있다. 각각의 공간에서는 눈으로 보는 설치미술부터 직접 조종하고 연주해야" 
                    + " 완성할 수 있는 참여형 작품까지 다양하게 만나볼 수 있다. 상쾌한 바닷바람이 부는 조각 공원. 해안 절벽 위에 조성한 공원은 약 3만 평의 규모를 자랑한다." 
                    + " 공원에선 각각의 테마와 어울리는 조각 작품부터 토양, 암석 등 자연재료를 활용한 대지 미술 등을 만나볼 수 있다. 조각 공원 내에 위치한 바다카페에선" 
                    + " 에메랄드빛 바다를 눈에 담으며 쉬어갈 수 있다. 벽에 걸린 그림에는 감흥이 생기지 않는다면 강릉 하슬라아트월드를 추천한다. 포토존은 덤, 신비로운 설치미술의 세계에서 색다른 자극을 얻게 될 것이다."
            },
            ["activity"]: {
                theme: "activity",
                title: "겨울철 필수 액티비티",
                localName: "강원도 평창군",
                info: "평창 '용평 리조트 스키장'" 
                    + " 2018 평창 동계 올림픽의 경기가 열렸던 스키장. 발왕산의 산맥을 따라 짜릿한 스키를 즐길 수 있다. 총 28면의 슬로프를 갖췄으며, 초급부터 최상급까지 난이도도 다양하다." 
                    + " 그중 올림픽에서 알파인 스키 경기를 펼쳤던 '레인보우 코스'가 인기다. 스키 외에도 눈썰매장, 발왕산 케이블 카, 발왕산 기 스카이워크 등이 자리해 지루할 틈이 없다."
                    + " 근처에 인기 드라마 <도깨비>의 촬영지였던 월정사 전나무 숲도 있으니 방문해 보는 것도 좋다. 곧게 뻗은 전나무가 만든 숲길로 걷기만 해도 힐링된다." 
                    + " 겨울이면 하얀 카펫이 깔린 듯한 눈길이 펼쳐지며 더욱 아름답다." 
            },
            ["sogcho"]: {
                theme: "sogcho",
                title: "속초 영금정",
                localName: "강원도 속초시 영금정로 43",
                info: " 속초 영금정은 속초 등대 밑의 바닷가에 넓게 자리 잡은 바위군을 일컫는다. 파도가 바위에 부딪치면서 내는 소리가 거문고 소리와 비슷하여 영금정이라 부른다." 
                    + " 동명해교와 함께 측면에서 촬영해도 좋고, 영금정 위에 올라 동명해교와 정자를 함께 사진 찍어도 좋다."
                    + " 도심에서 가까운 곳에 위치해 있고 경치가 아름다워 많은 여행객이 찾는 곳이다. 영금정에는 바다와 바다 언덕 위에 두 개의 정자가 마련되어 있는데" 
                    + " 동해의 푸른 바다와 정자의 어우러짐이 너무나 멋스러운 곳이다. 바다를 바라보고 오른쪽 계단으로 오르면 첫 번째 정자가 나타난다. 넓은 바다와 동명 방파제, 갯바위가 어우러진" 
                    + " 풍경이 눈에 들어온다. 특히 영금정에서 바라보는 동해의 일출은 장관이다. 많은 여행객들이 영금정을 찾는 이유는 바로 정자에서 바라보는 아름다운 풍경 때문이다."
                    + " 영금정의 해돋이 정자에서 바라보는 속초의 바다 풍경은 가슴을 확 트이게 해준다. 또 푸른 바다와 청량한 파도 소리의 조화가 매력적인 곳이기 때문에 더 인기가 많다."
            },
            ["alpeuseu"]: {
                theme: "alpeuseu",
                title: "알프스 마을",
                localName: "충남 청양군",
                info: "명당 7곳을 품었다는 칠갑산은 충남의 알프스라고 불린다. 칠갑산 정산 바로 아래 칠갑산 기슭에 자리 잡은 알프스 마을은 천장처럼 높다는 의미로 천장리라고 부르며, 아름다운 천장 호수와 더불어 천장리" 
                    + " 알프스 마을로 불리고 있다. 알프스란 이름처럼 겨울 액티비티, 하얀 풍경을 즐기기에 좋다. 얼음 봅슬레이, 눈썰매, 얼음 썰매, 깡통 기차, 짚트랙, 빙어낚시 등 어른, 아이"
                    + " 할 것 없이 재미있게 즐길 수 있는 체험 활동들이 많이 있다. 특히 매년 12월 말부터 이듬해 2월 중순까지 운영되는 칠갑산 얼음 분수 축제가 인기가 많다. 커다란 어름 분수 때문에 알프스 마을을 방문하면 마치 알프스 겨울 왕국에 들어온 것 같은 느낌이 든다." 
                    + " 매년 달라지는 얼음 조각과 눈 조각 등 많은 볼거리가 기다리고 있다. 이 얼음 분수 축제는 알프스 마을 눈썰매장 개장일과 동일하기 때문에 정확한 날짜는 알프스 마을 공식 홈페이지 공지를 참고하면 된다."
                    + " 알프스 마음의 재미있는 엑티비티와 더불어 빠질 수 없는 것이 바로 군것질거리다. 군고구마, 군밤, 빙어 튀김, 어묵, 닭꼬치, 전통 엿 등 겨울 여행 간식들도 맛볼 수 있다." 
                    + " 주민이 직접 농사 지은 재료로 차린 건강식도 식당에서 먹을 수 있다."
            },
        }

        themeObj = dummyThemeDB;
        themeDBInStorage = JSON.stringify(themeObj);
        localStorage.setItem('themeDB', themeDBInStorage);

        console.log('dummyThemeDB!! ', dummyThemeDB);
    }

    //실행 시 DB에 go~
    useEffect(() => {
        // 컴포넌트가 마운트될 때 실행 -> localStorage에 DB 생성
        themeData();
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행되도록 설정

    //handler
    const themeModalthumsClickHandler = (image) => {
        console.log('theme Snow Clicked!!');
        
        setIsModalOpen(true);

        let imgId = image.id;
        let dummyDB = image.dummyThemeDBItme;
        console.log('image.id : ', imgId);
        console.log('image.dummyThemeDBItme : ', dummyDB);

        if(imgId === 1){
            setModalData(dummyDB);

            console.log('snow modalData: ', modalData);
        }else if(imgId === 2){
            setModalData(dummyDB);

            console.log('drive modalData: ', modalData);
        }else if(imgId === 3){
            setModalData(dummyDB);

            console.log('forest modalData: ', modalData);
        }else if(imgId === 4){
            setModalData(dummyDB);

            console.log('waterpark modalData: ', modalData);
        }else if(imgId === 5){
            setModalData(dummyDB);

            console.log('holyPlace modalData: ', modalData);
        }else if(imgId === 6){
            setModalData(dummyDB);

            console.log('garosuGil modalData: ', modalData);
        }else if(imgId === 7){
            setModalData(dummyDB);

            console.log('beach modalData: ', modalData);
        }else if(imgId === 8){
            setModalData(dummyDB);

            console.log('intersection modalData: ', modalData);
        }else if(imgId === 9){
            setModalData(dummyDB);

            console.log('snhaseullaow modalData: ', modalData);
        }else if(imgId === 10){
            setModalData(dummyDB);

            console.log('activity modalData: ', modalData);
        }else if(imgId === 11){
            setModalData(dummyDB);

            console.log('sogcho modalData: ', modalData);
        }else if(imgId === 12){
            setModalData(dummyDB);

            console.log('alpeuseu modalData: ', modalData);
        }
    }

    //slick 설정
    const setting = {
        dots: true, //슬라이드 아래 도트 표시 여부
        infinite: true, // 무한 루프로 슬라이드를 이어갈지 여부
        speed: 500, // 슬라이드 전환 속도
        slidesToShow: imageList.length < 1 ? imageList.length : 3, //보여질 슬라이드 수 -> 이미지의 길이가 1보다 작으면 이미지 수만큼, 아니면 3개
        slidesToScroll: 1, // 한 번에 이동하는 스크롤 수
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        centerMode: true, //슬라이더의 중앙에 위치한 슬라이드를 크게 표시하는 기능을 제공
        centerPadding: '10px', //// 이미지 간격을 조절
        beforeChange: (current, next) => setCurrentSlide(next), //슬라이드 전환 전에 호출되는 콜백 함수. 현재 슬라이드와 다음 슬라이드의 인덱스를 받아서 처리 -> 라이브러리에서 제공하는 것
        autoplay: true, // 자동 재생 활성화
        autoplaySpeed: 2000, // 슬라이드 간의 시간 간격 (밀리초)
        customPaging: function (i) { //도트 외형 정의
            return (
              <div
                style={{
                  width: '10px', // 도트 너비
                  height: '10px', // 도트 높이
                  borderRadius: '50%',
                  border: '1px solid #788dad',
                  margin: '50px 0',
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

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };


    //imageList 배열에서 특정 조건에 따라 이미지를 필터링
    //카테고리가 all이면 imageList에 있는 모든 이미지
    //아니면 imageList 함수에 설정해 놓은 category에 따라 이미지를 보여줌
    const filteredImages = selectedCategory === 'all'
        ? imageList
        : imageList.filter(image => image.category === selectedCategory);

    return(
        <div id="theme_wrap">
            <div className="theme_wrap_class">
                <div className="theme_header">
                    <img className="quotationL_img" src='./resources/prj_imgs/theme/etc/left_quotation.png' />
                    &nbsp;테마 추천 여행지
                    <img className="quotationL_img" src='./resources/prj_imgs/theme/etc/right_quotation.png' />
                </div>
                
                <div className="theme_select_bar">
                    <button onClick={() => handleCategorySelect('all')}>
                        <span className="theme_selectbar_name">#</span>전체
                    </button>
                    <button onClick={() => handleCategorySelect('snow')}>
                        <span className="theme_selectbar_name">#</span>눈꽃여행
                    </button>
                    <button onClick={() => handleCategorySelect('beach')}>
                        <span className="theme_selectbar_name">#</span>바다여행
                    </button>
                    <button onClick={() => handleCategorySelect('forest')}>
                        <span className="theme_selectbar_name">#</span>힐링숲여행
                    </button>
                    <button onClick={() => handleCategorySelect('activity')}>
                        <span className="theme_selectbar_name">#</span>레저
                    </button>
                </div>
                <div id="slider">
                    <div className="theme_thums">
                        {/* sliderStyle 객체에 정의된 스타일을 슬라이더에 적용하고, setting객체에 정의된 설정을 슬라이더에 전달 
                        '...'은 모든 속성을 해당 위치에 펼쳐서 사용한다는 의미*/}
                        <Slider style={sliderStyle} {...setting} className="img_slide">
                            {/* 필터를 사용해 조건에 맞는 것만 map을 이용해 화면에 출력 */}
                            {filteredImages.map((image) => (
                                // 배열의 각 항목에 고유한 키를 제공
                                <div key={image.id} className="thum">
                                    {/* 이미지의 id값을 전달 */}
                                    <a href="#none" className="slide" onClick={() => themeModalthumsClickHandler(image)}>
                                        {/* 이미지 소스의 경로 */}
                                        <img src={image.src}/>
                                        {/* 이미지의 내용 */}
                                        <div className="img_content">{image.content}</div>
                                    </a>
                                </div>
                            ))}            
                            
                        </Slider>
                    </div>
                </div>

            {
                isModalOpen 
                ?
                <>
                    <Modal keyValue={modalData} modalViewer={setIsModalOpen}/>
                </>                  
                :
                <>
                </>
            }
            </div>
        </div>
    );
}

const CustomPrevArrow = (props) => {        // 캐러셀 화살표 커스텀부분(좌)
    const { onClick } = props;
    return (
        <img src='./resources/prj_imgs/theme/etc/left.png' id="leftArw" onClick={onClick} />
    );
};


const CustomNextArrow = (props) => {        // 캐러셀 화살표 커스텀부분(우)
    const { onClick } = props;
    return (
        <img src='./resources/prj_imgs/theme/etc/right.png' id="rightArw" onClick={onClick} />
    );
};

export default Theme;