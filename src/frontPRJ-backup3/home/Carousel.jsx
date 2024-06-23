import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/css/navigation';                          // 라이브러리 css 파일(아래 3개도 마찬가지)
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css';
import '../css/Carousel.css';                            // 커스텀 css 파일
import { useState } from 'react';
import Modal from "./Modal"

export default function RecomendSlider(props) {           // 변수나 함수, 클래스를 선언할 때 맨 앞에 export를 붙이면 내보내기 가능
    const [dbKey, setDbKey] = useState("");              // 모달창 연결을 위한 useState 선언 추가
    const [showModal, setshowModal] = useState(false);   // 첫번째 원소는 현재 상태, 두번째 원소는 Setter 함수

    const RecomendSpotClickHandler = (k) => {            // 3개 이미지 통으로 핸들러 만들어 분기 태우기                                                  
        setDbKey(k);
        setshowModal(true);
        props.menuViewer(false);                         //캐러셀 에서 모달창을 열때 메뉴바 안보이게 하기(상원)

        switch (k) {                                     // 핸들러 분기 태우기(snow~ 킷값)
            case 'snow':
                console.log('snow CLICKED!!');           // 이미지 클릭 시 각각의 콘솔 로그 찍히는지 확인!
                break;
            case 'gangwon':
                console.log('gangwon CLICKED!!');
                break;
            case 'incheon':
                console.log('incheon CLICKED!!');
                break;
        }
    }

    const [swiperPlaybutton, setswiperPlaybutton] = useState(null);    // usestate 활용 재생/정지 버튼

    const playButtonHandler = () => {
        swiperPlaybutton.autoplay.start();
    };
    const pauseButtonHandler = () => {
        swiperPlaybutton.autoplay.stop();
    };

    return (
        <Swiper
            className="recomend-slider"
            effect={'fade'}                                             // 여기서부터 캐러셀 기능 추가 부분
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            navigation={true}                                           // 화살표 내비
            pagination={{ clickable: true }}                            // 점 클릭으로 이동 가능
            loop={true}                                                 // 슬라이드 변경 반복
            autoplay={{ delay: 4000, disableOnInteraction: false, }}    // 처음부터 플레이, 바뀌는 시간
            onSwiper={setswiperPlaybutton}                              // 재생/정지 버튼 활성화
        >

            {
                showModal
                    ?
                    <Modal keyValue={dbKey} modalViewer={setshowModal} menuViewer={props.menuViewer} />
                    :
                    null
            }

            {/* a 태그와 img src 태그 */}
            {/* 이미지 경로 맞추기, 확인 필수!! */}
            <SwiperSlide><a href="#none" onClick={() => RecomendSpotClickHandler('snow')}>
                <img className='recomend_img' src={`resources/prj_imgs/carousel/recomend01.jpg`} />
                <div className='recomend_text_left_align'>
                    <div className='recomend_text_title_left'>
                        무주 '덕유산 국립 공원'
                    </div>
                    <div className='recomend_text_content_left'>
                        곤돌라는 타고 설천봉까지 이동해 '상제루'를 배경으로 인증샷을 남겨보자!<br />
                        정상까지 오르지 않고도 겨울 왕국과 마주할 수 있다는 점이 가장 큰 매력 포인트!
                    </div>
                </div>
            </a>
            </SwiperSlide>
            <SwiperSlide><a className='nanana' href="#none" onClick={() => RecomendSpotClickHandler('gangwon')}>
                <img className='recomend_img' src={`resources/prj_imgs/carousel/recomend02.jpg`} />
                <div className='recomend_text_center_align'>
                    <div className='recomend_text_title_center'>
                        화암동굴(강원고생대 국가지질공원)
                    </div>
                    <div className='recomend_text_content_center'>
                        금광산과 석회석 자연동굴이 어우러진 세계 유일의 동굴!<br />
                        금깨비와 은깨비를 동굴 내 연출하여 어린이들도 흥미롭게 동굴을 탐험할 수 있어요!
                    </div>
                </div>
            </a>

            </SwiperSlide>
            <SwiperSlide><a href="#none" onClick={() => RecomendSpotClickHandler('incheon')}>
                <img className='recomend_img' src={`resources/prj_imgs/carousel/recomend03.jpg`} />
                <div className='recomend_text_right_align'>
                    <div className='recomend_text_title_right'>
                        송도 한옥마을
                    </div>
                    <div className='recomend_text_content_right'>
                        송도 국제도시의 고층빌딩과 한옥단지의 대비, 서양과 동양의 만남!<br />
                        드라마 도깨비, 야왕, 파랑새의 집 촬영지로도 알려져 많은 사람이 찾는 장소!
                    </div>
                </div>
            </a>
            </SwiperSlide>

            {/* 재생/정지 버튼 */}
            {/* 포인터를 뗄 때 호출(눌려 있던 오브젝트에서 호출) */}
            <div className='start_pause_button_wrap'>
                <button type='button' className='start_button' onPointerUp={playButtonHandler}>▶</button>
                <button type='button' className='pause_button' onPointerUp={pauseButtonHandler}>❚❚</button>
            </div>
        </Swiper>
    )
}
