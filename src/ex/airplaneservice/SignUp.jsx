import React, { useState } from "react";

const SignUp = (props) => {                                 // Menubar에서 내려준 속성과 속성값들을 받았음! props는 부모에게서 가져온다는 뜻 = properties의 줄임말
    // 꼭 전체변수 선언하는곳에서 받아줘야함!!! 현재 컴포넌트의 제일 부모 함수에서!!


    // hook                                                 // hook이나 handler 등 주석 다는 습관 들이기!!! 중요
    const [uId, setUId] = useState('');                     // useState는 [함수, 함수를 설정하는 함수(앞에 set붙임)] / useState() <- 괄호 안에 함수의 기본값을 설정해줌!
    const [uPw, setUPw] = useState('');                     // 기본값은 숫자, 문자열, boolean값 가능! 다른 기본 데이터 형식도 가능한지는 공부해보기
    const [uMail, setUMail] = useState('');
    const [uPhone, setUPhone] = useState('');


    // handler
    const signUpBtnClickHandler = () => {                               // signUpBtn을 누르면 실행되는 함수
        console.log('signUpBtnClickHandler() CALLED!!');                // 현재 어디까지 실행되고 있는지 console.log로 확인하는 습관 들이기!!      

        let memberDBInStorage = localStorage.getItem('memberDB');       // localStorage에 있는 memberDB의 값을 가져와서 memberDBInStorage에 할당해줌! / localStorage에는 string형식 밖에 들어갈 수 없음! string형식이 아니면 아예 localStorage에 들어가지 않음!
        console.log(memberDBInStorage);                                 // memberDBInStorage 콘솔창에 띄우기

        if (memberDBInStorage === null) {                               // memberDBInStorage(memberDB)에 값이 없을 경우(한명도 회원가입 안 했을 경우)

            let newMemObj = {                                           // newMemObj 라는 변수를 만듬!
                [uId]: {                                                // uId를 key값으로 ex) gildong
                    'uPw': uPw,                                         // value값(uPw, uMail, uPhone)들을 {}를 이용해서 배열을 만들어서 차곡차곡 넣어줌.
                    'uMail': uMail,
                    'uPhone': uPhone,
                }
            }
            // =
            // newMemObj = {
            //     gildong: {                               key값 : gildong
            //         'uPw': uPw,                          value값 : uPw, uMail, uPhone
            //         'uMail': uMail,
            //         'uPhone': uPhone,
            //     }
            // }
            let newMemStr = JSON.stringify(newMemObj);                  // 위에서 선언한 newMemObj 함수를 json의 stringify(직열화)를 이용하여 newMemStr에 할당함.


            // newMemStr = {"gildong":{"uPw":"1234","uMail":"gildong@naver.com","uPhone":"01012341234"}}


            localStorage.setItem('memberDB', newMemStr);                // localStorage의 memberDB에 newMemStr을 추가함! (윗줄에서 stringify로 직열화 해주었으므로 넣을 수 있음)

            // 여기까지 localStorage.memberDB =
            // {"gildong":{"uPw":"1234","uMail":"gildong@naver.com","uPhone":"01012341234"}}

        } else {                                                        // memberDBInStorage(memberDB)에 값이 하나라도 있을 경우(한명이라도 가입 했을 경우)

            let memDBJSObj = JSON.parse(memberDBInStorage);             // memberDBInStorage(memberDB)에 있는 값(문자열)을 json의 parse(역직열화) 를 사용하여 javascript Object(객체)로 바꿨음! 그 후 memDBJSObj에 할당하였음.

            // 여기까지 localStorage.memberDB(=memDBJSObj) =
            //  {
            //     gildong: {                               
            //         'uPw': uPw,                          
            //         'uMail': uMail,
            //         'uPhone': uPhone,
            //     }
            //  }

            memDBJSObj[uId] = {                                         // memDBJSObj = memberDB를 parse로 풀어서 쓴 것.
                'uPw': uPw,                                             // 이미 memberDB자체가 {}로 크게 묶여있으므로 또 {}로 묶어줄 필요가 없음.
                'uMail': uMail,                                         // memDBJSObj[uId] = memDBJSObj.uId = memberDB.uID = uPw, uMail, uPhone이므로
                'uPhone': uPhone,                                       // memberDB의 uId(key)값은 uPw, uMail, uPhone이라는 꼴이 됨.
            };                                                          // 즉, memberDB에 새로 가입한 uId(key)값을 추가해주고, 그 안에 정보들을 추가하는것.
                                                                        // memberDB.chanho = {uPw, uMail, uPhone}
            // memDBJSObj에 값이 입력되기 전까지 =
            //  {
            //     gildong: {                               
            //         'uPw': uPw,                          
            //         'uMail': uMail,
            //         'uPhone': uPhone,
            //              }
            //  }

            // memDBJSObj에 값이 입력되면 = 
            //  {
            //  gildong: {                               
            //         'uPw': uPw,                          
            //         'uMail': uMail,
            //         'uPhone': uPhone,
            //              }, 
            //  chanho = {                                              // 새로운 key(uId) 값을 받았음!!
            //          'upw' : 0000,                                   // value값도 받았음!
            //          'uMail' : chanho@gmail.com,
            //          'uPhone' : 01022223333,
            //              }
            //  }

            let newMemStr = JSON.stringify(memDBJSObj);         // 다시 문자열로 바꿈!(string)

            // newMemStr = {"gildong":{"uPw":"1234","uMail":"gildong@naver.com","uPhone":"01012341234"}, "chanho":{"upw":"0000","uMail":"chanho@gmail.com","uPhone":"01022223333"}}

            localStorage.setItem('memberDB', newMemStr);        // 추가가 아니라 (key값을 새로 받으면 기존 값 {} 안에 추가를 함! 추가 한 후)덮어씌움! 수정이 아니라 기존 memberDB에 덮어 씌우는 것임!

            // 여기까지(한명 이상 있어서 추가했을 때)의 memberDB의 값 =
            // {"gildong":{"uPw":"1234","uMail":"gildong@naver.com","uPhone":"01012341234"}, "chanho":{"upw":"0000","uMail":"chanho@gmail.com","uPhone":"01022223333"}}

        }

        let reservationDBInStorage = localStorage.getItem('reservationDB');     // reservationDB의 값을 reservationDBInStorage에 할당하였음
        if (reservationDBInStorage === null) {                                  // reservationDBInStorage(reservationDB의)의 값이 아무것도 없을때

            let newReservationObj = {                                           // newReservationObj이라는 변수를 선언해서 {} 안에 key(uId) 값과 value 값을 받게 함!
                [uId]: {}                                                       // (회원가입 시점에서는 예약을 하지 않았기 때문에 newReservationObj이란 함수를 uId를 키값으로 하고 일단 빈 배열로 선언하여서 유저의 방만 만들어 놓은것!)
            }

            let newReservationStr = JSON.stringify(newReservationObj);          // newReservationObj의 값을 문자열화 하여 newReservationStr이란 변수에 할당 하였음!
            localStorage.setItem('reservationDB', newReservationStr);           // 그 문자열을 reservationDB에 넣어줌!

        } else {                                                                // 예약값이 있을 경우
            let reservationDBJsObj = JSON.parse(reservationDBInStorage);        // reservationDBInStorage(reservationDB)의 값(문자열)을 json의 parse(역직열화) 를 사용하여 javascript Object(객체)로 바꿨음! 그 후 reservationDBJsObj 할당하였음.
            reservationDBJsObj[uId] = {};                                       // reservationDBJsObj=reservationDBInStorage의 값을 parse로 풀어쓴 것.


            // 위의 signUp에서 했던것처럼

            // reservationDBJsObj에 값이 입력되기 전까지 = (회원가입 하는 순간 uId를 key값으로 빈 배열이 생성됨)
            //  {
            //     gildong: {}                               
            //  }

            // chanho가 회원가입 했을 경우
            //  {
            //  gildong: {},                                
            //  chanho = {}                                            
            //  }

            // reservationDBJsObj에 값이 입력되면 = 
            //  {
            //  gildong: {202312201021 : {gildong,}},                                
            //  chanho = {}                                            
            //  }

            let newReservationStr = JSON.stringify(reservationDBJsObj);         // reservationDBJsObj의 값을 직열화해서 newReservationStr에 할당해줌!
            localStorage.setItem('reservationDB', newReservationStr);           // 그 newReservationStr을 reservationDB에 넣어주었음! 
                                                                                // (key값을 새로 받으면 기존 값 {} 안에 추가를 함! 추가 한 후)덮어씌움! 수정이 아니라 기존 reservationDB에 덮어 씌우는 것임!
        }


        alert('SIGN UP SUCCESS!!');                                             // 회원가입 다하면 SIGN UP SUCCESS!! 알림창 뜨게 함

        props.homeViewer(true);                                                 // 그리고 MenuBar에서 내려준 homeViewer={setIsHome} 을 props로 받아 각각의 값을 true or false로 바꿔줌
        props.signUpViewer(false);                                              // 이 경우에는 회원가입을 완료하면 home화면이 출력되게 됨.
        props.signInViewer(false);
        props.reservationViewer(false);
        props.reservationListViewer(false);

    }

    const uIdChangeHandler = (e) => {                   // event 받기는 선택사항! 안받아도됨.
        console.log('uIdChangeHandler() CALLED!!');

        setUId(e.target.value);                         // input 창의 값이 바뀔때마다 value값을 받아서 UId 값을 set해줌!!

    }

    const uPwChangeHandler = (e) => {
        console.log('uPwChangeHandler() CALLED!!');

        setUPw(e.target.value);

    }

    const uMailChangeHandler = (e) => {
        console.log('uMailChangeHandler() CALLED!!');

        setUMail(e.target.value);

    }

    const uPhoneChangeHandler = (e) => {
        console.log('uPhoneChangeHandler() CALLED!!');

        setUPhone(e.target.value);

    }

    return (
        <>
            <div>
                <input type="text" name="uId" onChange={uIdChangeHandler} placeholder="Input user ID" />                            {/* input창의 value 데이터가 바뀔때마다 이벤트가 생기게 하고(onChange) 거기에 핸들러를 달아준거임! */}
                <br />
                <input type="password" name="uPw" onChange={uPwChangeHandler} placeholder="Input user PW" />
                <br />
                <input type="mail" name="uMail" onChange={uMailChangeHandler} placeholder="Input user MAIL" />
                <br />
                <input type="text" name="uPhone" onChange={uPhoneChangeHandler} placeholder="Input user PHONE" />
                <br />
                <input type="button" value="SIGN UP" onClick={signUpBtnClickHandler} />                                             {/* 회원가입 버튼을 클릭했을때의 핸들러를 달아준거임 onClick = 자바스크립트의 addEventListner('click'<- 이 부분!!!! , function () {~~}) 과 똑같음 */}
            </div>
        </>
    );

}

export default SignUp;